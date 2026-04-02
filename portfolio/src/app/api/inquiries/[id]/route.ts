import { NextResponse } from "next/server";

import { isDevHubAuthenticated } from "@/lib/devHubAuth";
import { inquiriesTable } from "@/lib/inquiries";

type Params = {
  params: Promise<{ id: string }>;
};

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return { supabaseUrl, serviceRoleKey };
}

export async function DELETE(_request: Request, context: Params) {
  const isAuthenticated = await isDevHubAuthenticated();

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json(
      {
        error:
          "Server configuration missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local, then restart the Next.js server.",
      },
      { status: 500 }
    );
  }

  const response = await fetch(`${config.supabaseUrl}/rest/v1/${inquiriesTable}?id=eq.${id}`, {
    method: "DELETE",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      Prefer: "return=minimal",
    },
  });

  if (!response.ok) {
    const failureMessage = await response.text();
    return NextResponse.json(
      { error: `Failed to delete inquiry. ${failureMessage || "Please try again."}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
