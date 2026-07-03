import connectDB from "../../../../../lib/db";
import categoryModel from "../../../../../models/categoryModel";
import { requireSignIn, isAdmin } from "../../../../../lib/authMiddleware";
import slugify from "slugify";

export async function POST(req) {
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
    if (!name) {
      return Response.json({ messeage: "Name is required" }, { status: 401 });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return Response.json(
        { success: true, message: "Category Already Exits" },
        { status: 200 }
      );
    }

    const category = await new categoryModel({ name, slug: slugify(name) }).save();

    return Response.json(
      { success: true, message: "new category created", category },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error in category", error: error.message },
      { status: 500 }
    );
  }
}
