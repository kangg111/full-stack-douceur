// app/api/account/add-address/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    firstName,
    lastName,
    company,
    address,
    apartment,
    postcode,
    city,
    state,
    phone,
    isDefault,
  } = body;

  // If setting as default, unset all other defaults first
  if (isDefault) {
    await prisma.address.updateMany({
      where: { userId: session.userId },
      data: { isDefault: false },
    });
  }

  const newAddress = await prisma.address.create({
    data: {
      userId: session.userId,
      firstName,
      lastName,
      company: company || null,
      address,
      apartment: apartment || null,
      postcode,
      city,
      state,
      phone,
      isDefault: isDefault ?? false,
    },
  });

  return NextResponse.json({ success: true, address: newAddress });
}
