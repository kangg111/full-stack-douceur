// app/api/locations/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // const locations = await prisma.location.findMany({
  //   where: { isActive: true },
  //   include: {
  //     hours: { orderBy: { sortOrder: "asc" } },
  //     features: { orderBy: { sortOrder: "asc" } },
  //   },
  //   orderBy: { sortOrder: "asc" },
  // });
  const locations = await prisma.location.findMany({
    include: {
      hours: true,
      features: true,
    },
  });

  return NextResponse.json(locations);
}
