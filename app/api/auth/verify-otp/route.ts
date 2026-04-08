// app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();

  // Find a valid, unused, non-expired OTP
  const otp = await prisma.otp.findFirst({
    where: {
      email,
      code,
      used: false,
      expiresAt: { gt: new Date() },
    },
  });

  if (!otp) {
    return NextResponse.json(
      { error: "Invalid or expired code" },
      { status: 401 },
    );
  }

  // Mark OTP as used
  await prisma.otp.update({
    where: { id: otp.id },
    data: { used: true },
  });

  // Get user
  const user = await prisma.user.findUnique({ where: { email } });

  // Save session
  const session = await getSession();
  session.userId = user!.id;
  session.email = user!.email;
  await session.save();

  return NextResponse.json({ success: true });
}
