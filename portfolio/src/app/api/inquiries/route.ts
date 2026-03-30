import { NextResponse } from "next/server";

import { inquiriesTable, inquiryStatuses, type InquiryStatus } from "@/lib/inquiries";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type CreateInquiryBody = {
  name?: string;
  email?: string;
  inquiryType?: string;
  message?: string;
};

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateInquiryBody;

  const name = body.name?.trim();
  const email = body.email?.trim();
  const inquiryType = body.inquiryType?.trim();
  const message = body.message?.trim();

  if (!name || !email || !inquiryType || !message) {
    return badRequest("name, email, inquiryType, and message are required.");
  }

  const { data, error } = await supabaseAdmin
    .from(inquiriesTable)
    .insert({
      name,
      email,
      inquiry_type: inquiryType,
      message,
      status: "new" satisfies InquiryStatus,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Unable to create inquiry.", details: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from(inquiriesTable)
    .select("id, name, email, inquiry_type, message, status, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Unable to fetch inquiries.", details: error.message },
      { status: 500 },
    );
  }

  const validStatuses = new Set<InquiryStatus>(inquiryStatuses);

  const sanitized = (data ?? []).filter((item) =>
    validStatuses.has(item.status as InquiryStatus),
  );

  return NextResponse.json({ inquiries: sanitized });
}
