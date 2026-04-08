// lib/session.ts
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import type { SessionData } from "../app/types";

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), {
    password: process.env.SESSION_SECRET!, // min 32 chars
    cookieName: "auth_session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}
