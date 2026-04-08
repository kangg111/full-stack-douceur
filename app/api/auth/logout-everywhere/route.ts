// app/api/auth/logout-everywhere/route.ts
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getSession();

  if (session.userId) {
    // Invalidate all unused OTPs for this user
    await prisma.otp.updateMany({
      where: { email: session.email, used: false },
      data: { used: true },
    });
  }

  // Destroy session
  session.destroy();

  return NextResponse.json({ success: true });
}
