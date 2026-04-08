// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();

  if (!session.userId) {
    return NextResponse.json({ isLoggedIn: false, email: null });
  }

  return NextResponse.json({
    isLoggedIn: true,
    email: session.email,
  });
}
