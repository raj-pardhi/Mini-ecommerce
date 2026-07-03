import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("❌ Please define the MONGO_URL environment variable in .env.local");
}

// Next.js dev mode me hot-reload har request pe file re-run karta hai,
// isliye connection ko global object me cache karna padta hai
// (warna "too many connections" error aayega)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URL, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log(`✅ Connected to MongoDB: ${cached.conn.connection.host}`);
  } catch (err) {
    cached.promise = null;
    console.log(`❌ Error in MongoDB connection: ${err.message}`);
    throw err;
  }

  return cached.conn;
}

export default connectDB;