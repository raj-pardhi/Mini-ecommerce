import connectDB from "../../../../../lib/db";
import productModel from "../../../../../models/productModel";

export async function GET() {
  try {
    await connectDB();

    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createAt: -1 });

    return Response.json(
      {
        success: true,
        countTotal: products.length,
        message: "ALIProducts",
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error in getting products", error: error.message },
      { status: 500 }
    );
  }
}
