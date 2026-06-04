import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI in .env.local");
}

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<any> | null;
  };
}

let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDb() {

  // If already connected
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists
  if (!cached.promise) {

    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then((mongoose) => {
        console.log("MongoDB Connected");
        return mongoose;
      });

  }

  // Wait for connection
  cached.conn = await cached.promise;

  return cached.conn;
}