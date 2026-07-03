import connectDB from "../../../../../lib/db";
import userModel from "../../../../../models/userModel";
import { hashPassword } from "../../../../../lib/authHelper";

export async function POST(req) {
  try {
    await connectDB();

    const { email, answer, newPassword } = await req.json();

    if (!email) {
      return Response.json({ message: "Email is required" }, { status: 400 });
    }
    if (!answer) {
      return Response.json({ message: "answer is required" }, { status: 400 });
    }
    if (!newPassword) {
      return Response.json({ message: "New Password is required" }, { status: 400 });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return Response.json(
        { success: false, message: "Wrong Email or Answer" },
        { status: 404 }
      );
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    return Response.json(
      { success: true, message: "Password Reset Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
