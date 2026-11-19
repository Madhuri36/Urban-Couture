
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

import productModel from "../models/productModel.js";

// --------------------------------------------------
// 1. SETUP PATHS AND LOAD ENVIRONMENT VARIABLES
// --------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendDir = path.resolve(__dirname, "..");

dotenv.config({
  path: path.join(backendDir, ".env"),
});

const assetsDir = path.resolve(
  backendDir,
  "../frontend/src/assets"
);

const assetsFile = path.join(assetsDir, "assets.js");

// --------------------------------------------------
// 2. VALIDATE ENVIRONMENT VARIABLES
// --------------------------------------------------

function validateEnvironment() {
  const requiredVariables = [
    "MONGODB_URI",
    "CLOUDINARY_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_SECRET_KEY",
  ];

  const missingVariables = requiredVariables.filter(
    (variable) => !process.env[variable]?.trim()
  );

  if (missingVariables.length > 0) {
    console.error("Missing environment variables:", missingVariables);
    throw new Error("Required environment variables are missing");
  }

  console.log("Environment variables loaded successfully.");
}

// --------------------------------------------------
// 3. CONFIGURE CLOUDINARY
// --------------------------------------------------

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// --------------------------------------------------
// 4. LOAD ORIGINAL PRODUCTS FROM assets.js
// --------------------------------------------------

function loadOriginalProducts() {
  if (!fs.existsSync(assetsFile)) {
    throw new Error(`assets.js not found at: ${assetsFile}`);
  }

  let source = fs.readFileSync(assetsFile, "utf8");

  // Extract image imports and map variables to filenames.
  const imageVariables = {};

  const importRegex =
    /import\s+(\w+)\s+from\s+['"]\.\/([^'"]+)['"]/g;

  let match;

  while ((match = importRegex.exec(source)) !== null) {
    imageVariables[match[1]] = match[2];
  }

  // Remove all frontend imports.
  source = source.replace(/^import\s+.*$/gm, "");

  // Remove the assets object.
  source = source.replace(
    /export const assets = \{[\s\S]*?\n\}\s*/,
    ""
  );

  // Convert the product export into a normal declaration.
  source = source.replace(
    "export const products =",
    "const products ="
  );

  // Evaluate only the product data with image filenames mapped.
  const sandbox = { ...imageVariables };

  const products = vm.runInNewContext(
    `${source}\nproducts;`,
    sandbox
  );

  if (!Array.isArray(products)) {
    throw new Error("Could not read the products array from assets.js");
  }

  if (products.length !== 52) {
    throw new Error(
      `Expected 52 products, but found ${products.length}`
    );
  }

  console.log(`Found ${products.length} original products.`);

  return products;
}

// --------------------------------------------------
// 5. UPLOAD PRODUCT IMAGES TO CLOUDINARY
// --------------------------------------------------

async function uploadProductImages(imageFiles, productId) {
  const imageUrls = [];

  for (let index = 0; index < imageFiles.length; index++) {
    const filename = imageFiles[index];

    const localImagePath = path.join(assetsDir, filename);

    if (!fs.existsSync(localImagePath)) {
      throw new Error(`Image file not found: ${localImagePath}`);
    }

    console.log(`Uploading image: ${filename}`);

    const result = await cloudinary.uploader.upload(
      localImagePath,
      {
        folder: "urban-couture/products",
        public_id: `${productId}_${index + 1}`,
        overwrite: true,
        resource_type: "image",
      }
    );

    imageUrls.push(result.secure_url);

    console.log(`Uploaded successfully: ${filename}`);
  }

  return imageUrls;
}

// --------------------------------------------------
// 6. IMPORT PRODUCTS INTO MONGODB
// --------------------------------------------------

async function seedProducts() {
  try {
    console.log("\nStarting Urban Couture migration...\n");

    validateEnvironment();

    console.log("\nConnecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully.\n");

    const originalProducts = loadOriginalProducts();

    let inserted = 0;
    let skipped = 0;

    for (const original of originalProducts) {
      const {
        _id: originalId,
        image: imageFiles,
        ...productDetails
      } = original;

      // Check if this original catalogue entry already exists.
      const existingProduct = await productModel.findOne({
        name: productDetails.name,
        price: productDetails.price,
        date: productDetails.date,
      });

      if (existingProduct) {
        console.log(
          `Skipping existing product: ${productDetails.name}`
        );

        skipped++;
        continue;
      }

      console.log(`\nProcessing: ${productDetails.name}`);

      // Upload all images belonging to this product.
      const imageUrls = await uploadProductImages(
        imageFiles,
        originalId
      );

      // Save the product with Cloudinary image URLs.
      await productModel.create({
        ...productDetails,
        image: imageUrls,
      });

      inserted++;

      console.log(
        `Product imported successfully (${inserted}/52)`
      );
    }

    console.log("\n================================");
    console.log("MIGRATION COMPLETED");
    console.log("================================");
    console.log(`Total original products: ${originalProducts.length}`);
    console.log(`New products imported: ${inserted}`);
    console.log(`Existing products skipped: ${skipped}`);
    console.log("================================\n");

  } catch (error) {
    console.error("\nMigration failed:", error.message);
    process.exitCode = 1;

  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("MongoDB connection closed.");
    }
  }
}

// --------------------------------------------------
// 7. RUN MIGRATION
// --------------------------------------------------

seedProducts();
