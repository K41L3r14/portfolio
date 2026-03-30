"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  inquiryStatuses,
  type InquiryRecord,
  type InquiryStatus,
} from "@/lib/inquiries";

const columnConfig: Record<InquiryStatus, { title: string; color: string }> = {
  new: {
    title: "New",
    color: "bg-[#fce68b]",
  },
  in_progress: {
    title: "In Progress",
    color: "bg-[#f9cbd3]",
  },
  done: {
    title: "Done",
    color: "bg-[#bde7c4]",
  },
};

function cardRotation(id: string) {
  const charCode = id.charCodeAt(0) || 1;
  const rotations = ["rotate-[-1deg]", "rotate-[1deg]", "rotate-[0deg]"];
  return rotations[charCode % rotations.length];
}

export default function DevHubPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingIds, setPendingIds] = useState<Record<string, boolean>>({});
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function loadInquiries() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/inquiries", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Unable to load inquiries.");
      }

      const data = (await response.json()) as { inquiries: InquiryRecord[] };
      setInquiries(data.inquiries ?? []);
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : "Unable to load inquiries.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadInquiries();
  }, []);

  async function updateStatus(id: string, status: InquiryStatus) {
    setPendingIds((current) => ({ ...current, [id]: true }));

    const previous = inquiries;
    setInquiries((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    try {
      const response = await fetch(`/api/inquiries/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Unable to update status.");
      }
    } catch {
      setInquiries(previous);
      setError("Unable to update inquiry status.");
    } finally {
      setPendingIds((current) => ({ ...current, [id]: false }));
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/dev-hub/logout", { method: "POST" });
      window.location.href = "/dev-hub/login";
    } finally {
      setIsLoggingOut(false);
    }
  }

  const grouped = useMemo(() => {
    return inquiryStatuses.reduce(
      (accumulator, status) => {
        accumulator[status] = inquiries.filter((item) => item.status === status);
        return accumulator;
      },
      {
        new: [] as InquiryRecord[],
        in_progress: [] as InquiryRecord[],
        done: [] as InquiryRecord[],
      },
    );
  }, [inquiries]);

  return (
    <main className="min-h-screen bg-[#f7f3ec] px-4 py-8 text-[#1f1b17] sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#3b332b]">Dev Hub</p>
            <h1 className="font-serif text-4xl text-[#e0584f] sm:text-5xl">Inquiry Board</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void handleLogout()}
              disabled={isLoggingOut}
              className="inline-flex w-fit items-center rounded-full border border-[#1f1b17] px-4 py-2 text-xs uppercase tracking-[0.25em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>
            <Link
              href="/#contactMe"
              className="inline-flex w-fit items-center rounded-full border border-[#1f1b17] px-4 py-2 text-xs uppercase tracking-[0.25em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec]"
            >
              Back to site
            </Link>
          </div>
        </header>

        {error ? (
          <p className="rounded-xl border border-[#9c3d35] bg-[#ffd9d6] px-4 py-2 text-sm text-[#6f1f19]">
            {error}
          </p>
        ) : null}

        {isLoading ? (
          <p className="text-sm uppercase tracking-[0.2em] text-[#3b332b]">Loading inquiries...</p>
        ) : (
          <section className="grid gap-5 lg:grid-cols-3">
            {inquiryStatuses.map((status) => (
              <div key={status} className="rounded-2xl border border-[#2d2926] bg-[#fdf8f1] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm uppercase tracking-[0.3em] text-[#3b332b]">
                    {columnConfig[status].title}
                  </h2>
                  <span className="rounded-full border border-[#2d2926] px-2 py-0.5 text-xs">
                    {grouped[status].length}
                  </span>
                </div>

                <div className="space-y-4">
                  {grouped[status].map((inquiry) => (
                    <article
                      key={inquiry.id}
                      className={`rounded-xl p-4 shadow-[2px_3px_0px_rgba(0,0,0,0.22)] ${columnConfig[status].color} ${cardRotation(inquiry.id)}`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.12em]">
                            {inquiry.name}
                          </p>
                          <p className="text-xs">{inquiry.email}</p>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#3b332b]">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <p className="text-xs uppercase tracking-[0.16em] text-[#3b332b]">
                        {inquiry.inquiry_type}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#1f1b17]">{inquiry.message}</p>

                      <label className="mt-3 block text-[10px] uppercase tracking-[0.2em] text-[#3b332b]">
                        Move to
                      </label>
                      <select
                        value={inquiry.status}
                        onChange={(event) =>
                          void updateStatus(inquiry.id, event.target.value as InquiryStatus)
                        }
                        disabled={Boolean(pendingIds[inquiry.id])}
                        className="mt-1 w-full rounded-md border border-[#2d2926] bg-white px-2 py-1 text-xs uppercase tracking-[0.15em]"
                      >
                        {inquiryStatuses.map((nextStatus) => (
                          <option key={nextStatus} value={nextStatus}>
                            {columnConfig[nextStatus].title}
                          </option>
                        ))}
                      </select>
                    </article>
                  ))}

                  {grouped[status].length === 0 ? (
                    <p className="rounded-lg border border-dashed border-[#2d2926]/50 px-3 py-6 text-center text-xs uppercase tracking-[0.2em] text-[#665c50]">
                      Empty
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
