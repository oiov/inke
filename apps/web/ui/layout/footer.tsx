"use client";

import Link from "next/link";
import Logo from "../shared/icons/logo";

export default function Footer() {
  return (
    <div className=" h-32 w-full bg-white py-5 text-center ">
      <Link
        href="/"
        className="font-display flex flex-col items-center justify-center text-xl"
      >
        <Logo className="h-8 w-8" />
      </Link>
      <div className="mt-2 flex items-center justify-center text-sm">
        <Link href="/privacy" className="hover:text-slate-300">
          Privacy Policy
        </Link>
        <span className="mx-2">‣</span>
        <Link className="hover:text-slate-300" href="/document">
          Document
        </Link>
        <span className="mx-2">‣</span>
        <Link
          className="items-end justify-center bg-gradient-to-r from-indigo-400 via-purple-400 to-purple-500 bg-clip-text font-semibold text-transparent hover:text-slate-300 "
          href="/pricing"
          target="_blank"
        >
          Pricing
        </Link>
      </div>
      <div className="mt-2 flex items-center justify-center gap-1 text-sm">
        <span>Copyright © 2023</span>
        <Link href="/" className="font-bold">
          <span className="bg-gradient-to-r from-slate-400 via-slate-600 to-slate-800 bg-clip-text text-transparent ">
            INK
          </span>
          <span>E</span>
        </Link>
      </div>
    </div>
  );
}
