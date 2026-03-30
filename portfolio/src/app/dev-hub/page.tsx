"use client";

import { type DragEvent, useEffect, useMemo, useState } from "react";

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
  const code = id.charCodeAt(0) || 1;
  const rotations = ["rotate-[-1deg]", "rotate-[1deg]", "rotate-[0deg]"];
  return rotations[code % rotations.length];
}

export default function DevHubPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingIds, setPendingIds] = useState<Record<string, boolean>>({});
  const [draggedInquiryId, setDraggedInquiryId] = useState<string | null>(null);
  const [dragOverStatus, setDragOverStatus] = useState<InquiryStatus | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function loadInquiries() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/inquiries", { cache: "no-store" });
      const result = (await response.json().catch(() => null)) as
        | { error?: string; inquiries?: InquiryRecord[] }
        | null;

      if (response.status === 401) {
        window.location.href = "/dev-hub/login";
        return;
      }

      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to load inquiries.");
      }

      setInquiries(result?.inquiries ?? []);
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : "Unable to load inquiries.";
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
      current.map((item) => (item.id === id ? { ...item, status } : item))
    );

    try {
      const response = await fetch(`/api/inquiries/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to update status.");
      }
    } catch (updateError) {
      const message = updateError instanceof Error ? updateError.message : "Unable to update status.";
      setError(message);
      setInquiries(previous);
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
      }
    );
  }, [inquiries]);

  function handleCardDragStart(inquiryId: string) {
    setDraggedInquiryId(inquiryId);
  }

  function handleCardDragEnd() {
    setDraggedInquiryId(null);
    setDragOverStatus(null);
  }

  function handleColumnDragOver(event: DragEvent<HTMLElement>, status: InquiryStatus) {
    event.preventDefault();
    setDragOverStatus(status);
  }

  function handleColumnDragLeave(status: InquiryStatus) {
    if (dragOverStatus === status) {
      setDragOverStatus(null);
    }
  }

  async function handleColumnDrop(status: InquiryStatus) {
    const inquiryId = draggedInquiryId;

    setDragOverStatus(null);
    setDraggedInquiryId(null);

    if (!inquiryId) {
      return;
    }

    const inquiry = inquiries.find((item) => item.id === inquiryId);

    if (!inquiry || inquiry.status === status || pendingIds[inquiryId]) {
      return;
    }

    await updateStatus(inquiryId, status);
  }

  return (
    <main className="min-h-screen bg-[#f7f3ec] px-4 py-8 text-[#1f1b17] sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="description-font text-xs uppercase tracking-[0.35em] text-[#3b332b]">
              Dev Hub
            </p>
            <h1 className="title-font text-4xl text-[#c94841] sm:text-5xl">Inquiry Board</h1>
          </div>
          <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={isLoggingOut}
            className="inline-flex w-fit items-center rounded-full border border-[#1f1b17] px-4 py-2 text-xs uppercase tracking-[0.25em] transition-colors hover:bg-[#1f1b17] hover:text-[#f7f3ec] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </button>
        </header>

        {error ? (
          <p className="rounded-xl border border-[#9c3d35] bg-[#ffd9d6] px-4 py-2 text-sm text-[#6f1f19]">
            {error}
          </p>
        ) : null}

        {isLoading ? (
          <p className="description-font text-sm uppercase tracking-[0.2em] text-[#3b332b]">
            Loading inquiries...
          </p>
        ) : (
          <section className="grid gap-5 lg:grid-cols-3">
            {inquiryStatuses.map((status) => (
              <div
                key={status}
                onDragOver={(event) => handleColumnDragOver(event, status)}
                onDragLeave={() => handleColumnDragLeave(status)}
                onDrop={() => void handleColumnDrop(status)}
                className={`rounded-2xl border bg-[#fdf8f1] p-4 transition-colors ${
                  dragOverStatus === status ? "border-[#c94841] bg-[#fff1dd]" : "border-[#2d2926]"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="description-font text-sm uppercase tracking-[0.3em] text-[#3b332b]">
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
                      draggable={!pendingIds[inquiry.id]}
                      onDragStart={() => handleCardDragStart(inquiry.id)}
                      onDragEnd={handleCardDragEnd}
                      className={`rounded-xl p-4 shadow-[2px_3px_0px_rgba(0,0,0,0.22)] ${columnConfig[status].color} ${cardRotation(
                        inquiry.id
                      )} ${
                        draggedInquiryId === inquiry.id ? "opacity-60 ring-2 ring-[#1f1b17]/30" : ""
                      } ${pendingIds[inquiry.id] ? "cursor-not-allowed" : "cursor-grab active:cursor-grabbing"}`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.12em]">{inquiry.name}</p>
                          <p className="text-xs">{inquiry.email}</p>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#3b332b]">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <p className="text-xs uppercase tracking-[0.16em] text-[#3b332b]">{inquiry.inquiry_type}</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#1f1b17]">{inquiry.message}</p>

                      <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#3b332b]">
                        Drag to another column to update status
                      </p>
                    </article>
                  ))}

                  {grouped[status].length === 0 ? (
                    <p className="description-font rounded-lg border border-dashed border-[#2d2926]/50 px-3 py-6 text-center text-xs uppercase tracking-[0.2em] text-[#665c50]">
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
