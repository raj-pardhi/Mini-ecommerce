import connectDB from "../../../../../../lib/db";
import categoryModel from "../../../../../../models/categoryModel";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { slug } = await params;
    const category = await categoryModel.findOne({ slug });

    return Response.json(
      { success: true, message: "Get Single Category Successfully", category },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error While getting Single Category", error: error.message },
      { status: 500 }
    );
  }
}
