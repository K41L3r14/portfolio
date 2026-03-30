import { NextResponse } from "next/server";

import { isDevHubAuthenticated } from "@/lib/devHubAuth";
import { inquiriesTable, inquiryStatuses, type InquiryStatus } from "@/lib/inquiries";

type Params = {
  params: Promise<{ id: string }>;
};

type Body = {
  status?: string;
};

export async function PATCH(request: Request, context: Params) {
  const isAuthenticated = await isDevHubAuthenticated();

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as Body;

  if (!body.status || !inquiryStatuses.includes(body.status as InquiryStatus)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      {
        error:
          "Server configuration missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local, then restart the Next.js server.",
      },
      { status: 500 }
    );
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${inquiriesTable}?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      status: body.status,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const failureMessage = await response.text();
    return NextResponse.json(
      { error: `Failed to update status. ${failureMessage || "Please try again."}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
