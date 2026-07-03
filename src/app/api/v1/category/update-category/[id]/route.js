import connectDB from "../../../../../../lib/db";
import categoryModel from "../../../../../../models/categoryModel";
import { requireSignIn, isAdmin } from "../../../../../../lib/authMiddleware";
import slugify from "slugify";

export async function PUT(req, { params }) {
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

    const { name } = await req.json();
    const { id } = await params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    return Response.json(
      { success: true, message: "Category Updated Successfully", category },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error while updating", error: error.message },
      { status: 500 }
    );
  }
}
