
import mongoose from "mongoose";

let connectionPromise = null;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                console.log("DB connected");
            })
            .catch((error) => {
                connectionPromise = null;
                console.error("MongoDB Error:", error.message);
                throw error;
            });
    }

    await connectionPromise;
};

export default connectDB;
