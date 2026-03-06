import { NextResponse } from "next/server";

type InquiryPayload = {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeField(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function validatePayload(body: unknown): { valid: true; payload: InquiryPayload } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body." };
  }

  const input = body as Record<string, unknown>;
  const payload: InquiryPayload = {
    name: normalizeField(input.name),
    email: normalizeField(input.email).toLowerCase(),
    inquiryType: normalizeField(input.inquiryType),
    message: normalizeField(input.message),
  };

  if (payload.name.length < 2 || payload.name.length > 80) {
    return { valid: false, error: "Name must be between 2 and 80 characters." };
  }

  if (!EMAIL_PATTERN.test(payload.email)) {
    return { valid: false, error: "Please provide a valid email address." };
  }

  if (!payload.inquiryType) {
    return { valid: false, error: "Please select an inquiry type." };
  }

  if (payload.message.length < 10 || payload.message.length > 2000) {
    return { valid: false, error: "Message must be between 10 and 2000 characters." };
  }

  return { valid: true, payload };
}

export async function POST(request: Request) {
  let parsedBody: unknown;

  try {
    parsedBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const validation = validatePayload(parsedBody);

  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const tableName = process.env.SUPABASE_INQUIRIES_TABLE ?? "portfolio_inquiries";

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Server configuration missing. Add Supabase env variables." },
      { status: 500 }
    );
  }

  const record = {
    name: validation.payload.name,
    email: validation.payload.email,
    inquiry_type: validation.payload.inquiryType,
    message: validation.payload.message,
  };

  const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify([record]),
  });

  if (!response.ok) {
    const failureMessage = await response.text();
    return NextResponse.json(
      { error: `Failed to save inquiry. ${failureMessage || "Please try again."}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
