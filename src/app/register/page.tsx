"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";


const palette = {
  pageBg: "#F3E9D9",
  cardBg: "#F7ECD9",
  banner: "#3A0000",
  bannerText: "#FFFFFF",
  accentText: "#FF5C5C",
};

export default function RegisterClientPage() {
  const [fullName, setFullName] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    if (!fullName.trim() || !accessCode.trim()) {
      setMessage("Please fill out both fields.");
      return;
    }

    try {
      setLoading(true);
      // TODO: replace with your actual API call
      // await fetch("/api/management/register-client", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ fullName, accessCode }),
      // });
      await new Promise((r) => setTimeout(r, 700));
      setMessage("Client registered successfully (demo).");
      setFullName("");
      setAccessCode("");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen w-full flex flex-col bg-[var(--pageBg)]"
      style={
        {
          // expose palette as CSS vars
          "--pageBg": palette.pageBg,
          "--cardBg": palette.cardBg,
          "--banner": palette.banner,
          "--bannerText": palette.bannerText,
          "--accentText": palette.accentText,
        } as React.CSSProperties
      }
    >
      {/* Top bar with context and logo */}
      <header className="w-full px-6 py-5 flex items-center justify-between">
        <div
          className="text-[22px] font-semibold"
          style={{ color: palette.accentText }}
        >
          [Management View]
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/scheduling-of-care-logo.png" // <-- replace with your file under /public
            alt="Scheduling of Care"
            width={210}
            height={60}
            priority
          />
        </div>
      </header>

      {/* Banner */}
      <div className="w-full bg-[var(--banner)] text-[var(--bannerText)]">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-center">
            Register Client with Access Code
          </h1>
        </div>
      </div>

      {/* Form section */}
      <section className="flex-1 w-full">
        <div className="max-w-5xl mx-auto px-6">
          <div className="py-14 flex flex-col items-center gap-10">
            <form
              onSubmit={onSubmit}
              className="w-full max-w-2xl bg-[var(--pageBg)]/0"
              aria-labelledby="register-heading"
            >
              <div className="space-y-9">
                {/* Client Full Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                  <label
                    htmlFor="fullName"
                    className="md:w-1/3 text-lg md:text-xl font-medium text-zinc-900 flex items-center gap-2"
                  >
                    <span>Client Full Name</span>
                    <InfoDot title="Enter the client's legal full name as on record." />
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="md:flex-1 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-zinc-300/50"
                  />
                </div>

                {/* Client Access Code */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                  <label
                    htmlFor="accessCode"
                    className="md:w-1/3 text-lg md:text-xl font-medium text-zinc-900 flex items-center gap-2"
                  >
                    <span>Client Access Code</span>
                    <InfoDot title="This code is provided by the system or admin for client linking." />
                  </label>
                  <input
                    id="accessCode"
                    name="accessCode"
                    type="text"
                    inputMode="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="md:flex-1 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-lg shadow-sm tracking-wide focus:outline-none focus:ring-4 focus:ring-zinc-300/50"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="mt-12 flex items-center justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full px-10 py-3 text-xl font-semibold text-white shadow-md transition active:scale-95 disabled:opacity-60"
                  style={{ backgroundColor: palette.banner }}
                >
                  {loading ? "Registering…" : "Register"}
                </button>
              </div>

              {/* Message */}
              {message && (
                <p className="mt-6 text-center text-base text-zinc-700">
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Floating help button */}
      <HelpButton />
    </main>
  );
}

function InfoDot({ title }: { title?: string }) {
  return (
    <span
      title={title}
      aria-label={title}
      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-300 text-white text-[12px] leading-none select-none"
    >
      i
    </span>
  );
}

function HelpButton() {
  return (
    <Link
      href="#"
      aria-label="Help"
      className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-rose-300 text-white text-2xl shadow-lg"
      title="Help"
    >
      ?
    </Link>
  );
}
