// app/api/auth/request-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Upsert user (create if not exists)
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  // Generate 6-digit OTP
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

  // Save OTP to DB
  await prisma.otp.create({
    data: { code, email, expiresAt },
  });

  // Send email
  await sendOtpEmail(email, code);

  return NextResponse.json({ success: true });
}
