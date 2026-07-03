import connectDB from "../../../../../../lib/db";
import categoryModel from "../../../../../../models/categoryModel";
import { requireSignIn, isAdmin } from "../../../../../../lib/authMiddleware";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const decodedUser = await requireSignIn(req);
    if (!decodedUser) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const isUserAdmin = await isAdmin(decodedUser);
    if (!isUserAdmin) {
      return Response.json({ success: false, message: "UnAuthorized Access" }, { status: 401 });
    }

    const { id } = await params;
    await categoryModel.findByIdAndDelete(id);

    return Response.json(
      { success: true, message: "Category Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error While Delete Category", error: error.message },
      { status: 500 }
    );
  }
}
