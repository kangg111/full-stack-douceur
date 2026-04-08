// app/api/account/update-profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { firstName, lastName } = await req.json();

  const user = await prisma.user.update({
    where: { id: session.userId },
    data: { firstName, lastName },
  });

  return NextResponse.json({
    success: true,
    firstName: user.firstName,
    lastName: user.lastName,
  });
}
