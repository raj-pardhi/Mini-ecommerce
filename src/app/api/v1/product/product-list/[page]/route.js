import connectDB from "../../../../../../lib/db";
import productModel from "../../../../../../models/productModel";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { page } = await params;
    const perPage = 6;
    const currentPage = page ? page : 1;

    const products = await productModel
      .find({})
      .select("-photo")
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return Response.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "error in per page ctrl", error: error.message },
      { status: 400 }
    );
  }
}
