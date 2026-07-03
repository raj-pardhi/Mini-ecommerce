import { requireSignIn } from "../../../../../lib/authMiddleware";

export async function GET(req) {
  const decodedUser = await requireSignIn(req);
  if (!decodedUser) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ ok: true }, { status: 200 });
}
