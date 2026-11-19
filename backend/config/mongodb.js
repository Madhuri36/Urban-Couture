
import mongoose from "mongoose";

let connectionPromise = null;

const connectDB = async () => {
    const uri = process.env.MONGODB_URI?.trim();

    console.log("MongoDB URI check:", {
        exists: Boolean(uri),
        startsCorrectly:
            uri?.startsWith("mongodb://") ||
            uri?.startsWith("mongodb+srv://"),
        length: uri?.length
    });

    if (!uri || !uri.startsWith("mongodb")) {
        throw new Error("MONGODB_URI is missing or has an invalid format");
    }

    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(uri)
            .then(() => console.log("DB connected"))
            .catch((error) => {
                connectionPromise = null;
                console.error("MongoDB Error:", error.message);
                throw error;
            });
    }

    await connectionPromise;
};

export default connectDB;
