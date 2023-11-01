"use client";

import Image from "next/image";
import Link from "next/link";

export default function UINotFound() {
  return (
    <>
      <div className="z-10 mx-auto mt-24 flex w-full max-w-xl flex-col items-center justify-center px-5">
        <Image
          src="/cat.png"
          alt="404"
          width="250"
          height="250"
          className="ml-4 rounded-sm"
          priority
        />
        <Link
          href="/"
          className="mt-24 rounded-md border px-4 py-2 text-sm hover:border-gray-800"
        >
          Oops, Cat Not Found!
        </Link>
      </div>
    </>
  );
}

export function NoteNotFound() {
  return (
    <>
      <div className="z-10 mx-auto mt-24 flex w-full max-w-xl flex-col items-center justify-center px-5">
        <Image
          src="/cat.png"
          alt="404"
          width="250"
          height="250"
          className="ml-4 rounded-sm"
          priority
        />
        <Link
          href="/"
          className="mt-24 rounded-md border px-4 py-2 text-sm hover:border-gray-800"
        >
          Oops, Cat Not Found!
        </Link>
      </div>
    </>
  );
}
