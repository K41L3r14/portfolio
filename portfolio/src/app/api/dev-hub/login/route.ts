import { NextResponse } from "next/server";

import {
  DEV_HUB_SESSION_COOKIE,
  devHubPassword,
  devHubSessionToken,
} from "@/lib/devHubAuth";

type LoginBody = {
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBody;

  if (!devHubPassword || !devHubSessionToken) {
    return NextResponse.json(
      { error: "Dev hub auth env vars are not configured." },
      { status: 500 }
    );
  }

  if (!body.password || body.password !== devHubPassword) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: DEV_HUB_SESSION_COOKIE,
    value: devHubSessionToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return response;
}
