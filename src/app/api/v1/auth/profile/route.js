import connectDB from "../../../../../lib/db";
import userModel from "../../../../../models/userModel";
import { hashPassword } from "../../../../../lib/authHelper";
import { requireSignIn } from "../../../../../lib/authMiddleware";

export async function PUT(req) {
  try {
    await connectDB();

    const decodedUser = await requireSignIn(req);
    if (!decodedUser) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { name, email, password, address, phone } = await req.json();
    const user = await userModel.findById(decodedUser._id);

    if (password && password.length < 6) {
      return Response.json({ error: "Password is required and 6 charecter long" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      decodedUser._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    return Response.json(
      {
        success: true,
        message: "Profile Updated Successfully",
        updatedUser,
      },
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
