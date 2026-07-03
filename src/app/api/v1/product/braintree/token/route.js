import gateway from "@/lib/braintree";

export async function GET() {
  try {
    const response = await new Promise((resolve, reject) => {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) reject(err);
        else resolve(response);
      });
    });

    return Response.json(response);
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
