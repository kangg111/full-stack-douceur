// app/account/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import AccountClient from "./AccountClient";
import { PolicyContent } from "@/app/types";

export default async function AccountPage() {
  const session = await getSession();
  if (!session.userId) redirect("/auth");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { addresses: { orderBy: { isDefault: "desc" } } },
  });

  return (
    <AccountClient
      user={{
        firstName: user?.firstName ?? null,
        lastName: user?.lastName ?? null,
        email: user?.email ?? "",
      }}
      initialAddresses={user?.addresses ?? []}
    />
  );
}
