"use client";

import { Session } from "next-auth";
import Image from "next/image";

export default function Wrapper({ session }: { session: Session | null }) {
  return (
    <>
      <div className="mx-auto h-screen max-w-3xl px-6">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/cat.png"
            alt="404"
            width="250"
            height="250"
            className="ml-4 rounded-sm"
          />
          <p>Please waiting...</p>
        </div>
      </div>
    </>
  );
}
