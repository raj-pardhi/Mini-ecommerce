import connectDB from "../../../../../lib/db";
import userModel from "../../../../../models/userModel";
import { hashPassword } from "../../../../../lib/authHelper";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password, phone, address, answer } = await req.json();

    // validation
    if (!name) {
      return Response.json({ error: "Name is Required" });
    }
    if (!email) {
      return Response.json({ message: "Email is Required" });
    }
    if (!password) {
      return Response.json({ message: "Password is Required" });
    }
    if (!phone) {
      return Response.json({ message: "Phone no is Required" });
    }
    if (!address) {
      return Response.json({ message: "Address is Required" });
    }
    if (!answer) {
      return Response.json({ message: "Answer is Required" });
    }

    // check user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return Response.json(
        { success: true, message: "Already Regiter please login" },
        { status: 200 }
      );
    }

    // register user
    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    return Response.json(
      {
        success: true,
        message: "User Register Successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Error in Registration",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
