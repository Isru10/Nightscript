import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined in .env");

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(MONGODB_URI);
  isConnected = true;
}
