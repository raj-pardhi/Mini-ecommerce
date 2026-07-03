import connectDB from "../../../../../lib/db";
import orderModel from "../../../../../models/orderModel";
import { requireSignIn, isAdmin } from "../../../../../lib/authMiddleware";

export async function GET(req) {
  try {
    await connectDB();

    const decodedUser = await requireSignIn(req);
    if (!decodedUser) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const isUserAdmin = await isAdmin(decodedUser);
    if (!isUserAdmin) {
      return Response.json({ success: false, message: "UnAuthorized Access" }, { status: 401 });
    }

    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name");

    return Response.json(orders);
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error WHile Geting Orders", error: error.message },
      { status: 500 }
    );
  }
}
