import connectDB from "@/lib/db";
import productModel from "@/models/productModel";
import { requireSignIn, isAdmin } from "@/lib/authMiddleware";
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

    // formidable ki jagah - native formData use kar rahe hain
    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const quantity = formData.get("quantity");
    const shipping = formData.get("shipping");
    const photo = formData.get("photo"); // File object ya null

    // validation
    switch (true) {
      case !name:
        return Response.json({ error: "Name is Required" }, { status: 400 });
      case !description:
        return Response.json({ error: "description is Required" }, { status: 400 });
      case !price:
        return Response.json({ error: "price is Required" }, { status: 400 });
      case !category:
        return Response.json({ error: "category is Required" }, { status: 400 });
      case !quantity:
        return Response.json({ error: "quantity is Required" }, { status: 400 });
      case photo && photo.size > 1000000:
        return Response.json(
          { error: "Photo is Required and should be less than 1mb" },
          { status: 400 }
        );
    }

    const products = new productModel({
      name,
      description,
      price,
      category,
      quantity,
      shipping: shipping === "true" || shipping === "1",
      slug: slugify(name),
    });

    if (photo && photo.size > 0) {
      const bytes = await photo.arrayBuffer();
      products.photo.data = Buffer.from(bytes);
      products.photo.contentType = photo.type;
    }

    await products.save();

    return Response.json(
      { success: true, message: "Product Created Successfullt", products },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error in creating product", error: error.message },
      { status: 500 }
    );
  }
}