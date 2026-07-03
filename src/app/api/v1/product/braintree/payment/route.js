import connectDB from "@/lib/db";
import orderModel from "@/models/orderModel";
import gateway from "@/lib/braintree";
import { requireSignIn } from "@/lib/authMiddleware";

export async function POST(req) {
  try {
    await connectDB();

    const decodedUser = await requireSignIn(req);
    if (!decodedUser) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { nonce, cart } = await req.json();

    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const result = await new Promise((resolve, reject) => {
      gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) resolve(result);
          else reject(error);
        }
      );
    });

    await new orderModel({
      products: cart,
      payment: result,
      buyer: decodedUser._id,
    }).save();

    return Response.json({ ok: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}