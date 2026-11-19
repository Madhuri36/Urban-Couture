
import mongoose from "mongoose";

let connectionPromise = null;

const connectDB = async () => {
    const uri = process.env.MONGODB_URI?.trim();

    if (!uri) {
        throw new Error("MONGODB_URI is missing");
    }

    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(uri, {
            serverSelectionTimeoutMS: 8000,
            connectTimeoutMS: 8000,
        })
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch((error) => {
            connectionPromise = null;
            console.error("MongoDB connection failed:", error.name, error.message);
            throw error;
        });
    }

    await connectionPromise;
};

export default connectDB;
