import JWT from "jsonwebtoken";
import connectDB from "./db.js";
import userModel from "../models/userModel.js";

// ============================================================
// Protected route - token base verification
// ============================================================
// Express me ye (req, res, next) leta tha aur req.user set karke next() call karta tha.
// Next.js me hum decoded user return karte hain (ya null agar invalid/missing token hai).
// Route handler ke andar isse call karke khud check karna hoga.
export const requireSignIn = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return null;
    }

    const decode = JWT.verify(authHeader, process.env.JWT_SECRET);
    return decode; // { _id, iat, exp } — jo bhi token banate waqt sign kiya tha
  } catch (error) {
    console.log(error);
    return null;
  }
};

// ============================================================
// Admin access check
// ============================================================
// Pehle requireSignIn se decoded user milega, phir uska role check karenge.
// Ye function true/false return karega instead of next() call karne ke.
export const isAdmin = async (decodedUser) => {
  try {
    if (!decodedUser) return false;

    await connectDB();
    const user = await userModel.findById(decodedUser._id);

    if (!user || user.role !== 1) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};