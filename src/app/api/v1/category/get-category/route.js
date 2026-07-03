import connectDB from "../../../../../lib/db";
import categoryModel from "../../../../../models/categoryModel";

export async function GET() {
  try {
    await connectDB();

    const category = await categoryModel.find({});

    return Response.json(
      { success: true, message: "All Categories List", category },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error white getting all categories", error: error.message },
      { status: 500 }
    );
  }
}
