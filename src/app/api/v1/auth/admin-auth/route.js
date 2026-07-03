import { requireSignIn, isAdmin } from "../../../../../lib/authMiddleware";

export async function GET(req) {
  const decodedUser = await requireSignIn(req);
  if (!decodedUser) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const isUserAdmin = await isAdmin(decodedUser);
  if (!isUserAdmin) {
    return Response.json({ success: false, message: "UnAuthorized Access" }, { status: 401 });
  }

  return Response.json({ ok: true }, { status: 200 });
}
