import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const API = process.env.API_URL || "http://localhost:5000";
const MAX_AGE = 7 * 24 * 60 * 60;
const base = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
});

// Exchanges a verified BetterAuth session for an HTTPOnly JWT cookie that the Express API trusts.
export async function POST() {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) return NextResponse.json({ message: "Not signed in" }, { status: 401 });

  const r = await fetch(`${API}/api/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-internal-secret": process.env.INTERNAL_SECRET || "" },
    body: JSON.stringify({ email: session.user.email, name: session.user.name }),
  });
  if (!r.ok) return NextResponse.json({ message: "Could not reach the API" }, { status: 502 });

  const { token } = await r.json();
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, { ...base(), maxAge: MAX_AGE });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", "", { ...base(), maxAge: 0 });
  return res;
}
