import connectDB from "../../../../../lib/db";
import productModel from "../../../../../models/productModel";

export async function GET() {
  try {
    await connectDB();

    const total = await productModel.find({}).estimatedDocumentCount();

    return Response.json({ success: true, total }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error in product count", error: error.message },
      { status: 400 }
    );
  }
}
