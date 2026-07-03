import connectDB from "../../../../../../lib/db";
import productModel from "../../../../../../models/productModel";
import categoryModel from "../../../../../../models/categoryModel";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const category = await categoryModel.findOne({ slug });
    const products = await productModel.find({ category }).populate("category");

    return Response.json({ success: true, category, products }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error while getting products", error: error.message },
      { status: 400 }
    );
  }
}
