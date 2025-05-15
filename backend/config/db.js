import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = process.env.MONGO_URI;
    const conn = await mongoose.connect(db);
    console.log("MongoDB connected: " + conn.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
