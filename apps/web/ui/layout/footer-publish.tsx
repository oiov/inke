"use client";

import Link from "next/link";
import Logo from "../shared/icons/logo";

export default function FooterPublish() {
  return (
    <div className=" h-32 w-full bg-white py-5 text-center ">
      <Link
        href="/"
        className="font-display flex flex-col items-center justify-center text-xl"
      >
        <Logo className="h-8 w-8" />
      </Link>

      <div className="mt-2 flex items-center justify-center gap-1 text-sm">
        <span>Powered by</span>
        <Link href="/" className="font-bold">
          <span className="bg-gradient-to-r from-slate-400 via-slate-600 to-slate-800 bg-clip-text text-transparent ">
            INK
          </span>
          <span>E & AI</span>
        </Link>
      </div>
      {/* <p>Thanks A Note</p> */}
    </div>
  );
}