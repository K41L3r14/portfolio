export const inquiryStatuses = ["new", "in_progress", "done"] as const;

export type InquiryStatus = (typeof inquiryStatuses)[number];

export type InquiryRecord = {
  id: string;
  name: string;
  email: string;
  inquiry_type: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
};

export const inquiriesTable =
  process.env.SUPABASE_INQUIRIES_TABLE || "portfolio_inquiries";
