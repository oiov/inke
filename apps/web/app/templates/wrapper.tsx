"use client";

import { Session } from "next-auth";

export default function Wrapper({ session }: { session: Session | null }) {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6 py-6">working...</div>
    </>
  );
}
