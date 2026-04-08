// app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { isAvailable: true },
    include: {
      category: true,
    },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(products);
}
