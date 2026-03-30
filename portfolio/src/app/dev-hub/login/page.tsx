"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DevHubLoginPage() {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/dev-hub/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Login failed.");
      }

      const nextPath = searchParams.get("next") || "/dev-hub";
      router.replace(nextPath);
      router.refresh();
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Login failed.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f3ec] px-4 py-10 text-[#1f1b17] sm:px-6">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-[#2d2926] bg-[#fdf8f1] p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-[#3b332b]">Dev Hub</p>
        <h1 className="mt-2 font-serif text-4xl text-[#e0584f]">Private Login</h1>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-[#2d2926] bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[#3b332b]/70 focus:border-[#e0584f]"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#1f1b17] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#f7f3ec] transition-colors hover:bg-[#e0584f] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          {error ? <p className="text-sm text-[#7d2c25]">{error}</p> : null}
        </form>
      </div>
    </main>
  );
}
