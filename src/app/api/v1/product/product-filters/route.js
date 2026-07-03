import connectDB from "../../../../../lib/db";
import productModel from "../../../../../models/productModel";

export async function POST(req) {
  try {
    await connectDB();

    const { checked, radio } = await req.json();
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel.find(args);

    return Response.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Error While Filtering Products", error: error.message },
      { status: 400 }
    );
  }
}
