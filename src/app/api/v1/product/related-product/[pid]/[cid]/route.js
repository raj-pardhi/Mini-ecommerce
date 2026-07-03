import connectDB from "../../../../../../../lib/db";
import productModel from "../../../../../../../models/productModel";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { pid, cid } = await params;

    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");

    return Response.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error while getting related product", error: error.message },
      { status: 400 }
    );
  }
}
