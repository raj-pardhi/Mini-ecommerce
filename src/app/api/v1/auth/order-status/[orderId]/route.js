import connectDB from "../../../../../../lib/db";
import orderModel from "../../../../../../models/orderModel";
import { requireSignIn, isAdmin } from "../../../../../../lib/authMiddleware";

export async function PUT(req, { params }) {
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

    const { orderId } = await params; // Next.js 15+ me params async hai
    const { status } = await req.json();

    const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    return Response.json(orders);
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error WHile Geting Orders", error: error.message },
      { status: 500 }
    );
  }
}
