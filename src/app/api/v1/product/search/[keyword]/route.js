import connectDB from "../../../../../../lib/db";
import productModel from "../../../../../../models/productModel";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { keyword } = await params;

    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");

    return Response.json(results);
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error In Search Product API", error: error.message },
      { status: 400 }
    );
  }
}
