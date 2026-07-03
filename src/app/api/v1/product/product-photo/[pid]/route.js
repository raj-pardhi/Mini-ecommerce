import connectDB from "../../../../../../lib/db";
import productModel from "../../../../../../models/productModel";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { pid } = await params;
    const product = await productModel.findById(pid).select("photo");

    if (product?.photo?.data) {
      return new Response(product.photo.data, {
        status: 200,
        headers: {
          "Content-Type": product.photo.contentType,
        },
      });
    }

    return Response.json({ success: false, message: "Photo not found" }, { status: 404 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error while getting photo", error: error.message },
      { status: 500 }
    );
  }
}
