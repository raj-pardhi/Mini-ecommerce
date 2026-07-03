import connectDB from "../../../../../lib/db";
import userModel from "../../../../../models/userModel";
import { comparePassword } from "../../../../../lib/authHelper";
import JWT from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { success: false, message: "Inavalid email or password" },
        { status: 404 }
      );
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return Response.json(
        { success: false, message: "Email is not registered" },
        { status: 404 }
      );
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return Response.json(
        { success: false, message: "Invalid Password" },
        { status: 200 }
      );
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return Response.json(
      {
        success: true,
        message: "Login Successfully",
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error in login", error: error.message },
      { status: 500 }
    );
  }
}
