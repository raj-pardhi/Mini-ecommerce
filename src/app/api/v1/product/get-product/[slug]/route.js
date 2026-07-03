import connectDB from "../../../../../../lib/db";
import productModel from "../../../../../../models/productModel";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const product = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");

    return Response.json(
      { success: true, message: "single Product Fetched", product },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error while getting single product", error: error.message },
      { status: 500 }
    );
  }
}
