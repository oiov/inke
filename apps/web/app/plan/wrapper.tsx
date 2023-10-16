"use client";

import { Session } from "next-auth";

export default function Wrapper({ session }: { session: Session | null }) {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-lg font-bold">Plan</h2>
      </div>
    </>
  );
}
