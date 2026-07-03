import connectDB from "../../../../../../lib/db";
import productModel from "../../../../../../models/productModel";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { pid } = await params;
    await productModel.findByIdAndDelete(pid).select("-photo");

    return Response.json(
      { success: true, message: "Product deleting successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error while deleting product", error: error.message },
      { status: 500 }
    );
  }
}
