import { NextResponse } from "next/server";

import { inquiriesTable, inquiryStatuses, type InquiryStatus } from "@/lib/inquiries";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type Params = {
  params: Promise<{ id: string }>;
};

type UpdateStatusBody = {
  status?: string;
};

export async function PATCH(request: Request, context: Params) {
  const { id } = await context.params;
  const body = (await request.json()) as UpdateStatusBody;

  if (!body.status || !inquiryStatuses.includes(body.status as InquiryStatus)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from(inquiriesTable)
    .update({
      status: body.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "Unable to update inquiry status.", details: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
