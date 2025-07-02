import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export async function connect() {
  const MONGO_URI = process.env.MONGODB_URI;

  if (!MONGO_URI) {
    throw new Error("❌ MONGODB_URI not found in .env");
  }

  // Avoid reconnecting if already connected
  if (mongoose.connection.readyState === 1) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "authorization", // Optional: explicit DB name
    });

    console.log("✅ MongoDB connected");

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB error:", err);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    throw err;
  }
}
