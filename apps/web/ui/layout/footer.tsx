"use client";

import Link from "next/link";
import Logo from "../shared/icons/logo";
import { useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [isShowLocalHunt, setShowLocalHunt] = useState(false);

  const imageLoader = ({ src, width }) => {
    return `${src}?w=${width}`;
  };

  return (
    <div className="flex h-full min-h-[256px] w-screen flex-col items-start justify-between gap-4 bg-slate-800 px-5 py-8 sm:flex-row sm:px-16">
      <div className="flex flex-col items-start justify-start">
        <Link href="/" className="mb-4 flex items-center text-3xl font-bold">
          <Image
            className="mr-2"
            src="/logo.png"
            width="25"
            height="25"
            alt="logo"
          ></Image>
          <span className="bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 bg-clip-text text-transparent ">
            INK
          </span>
          <span className="text-slate-100">E</span>
        </Link>
        <p className="font-mono text-slate-200">
          AI notebook, empowering writing.
        </p>

        <div className="my-4 flex items-center justify-center gap-1 text-sm text-slate-400">
          <span className="text-slate-200">© 2023</span>
          <Link href="/" className="font-bold">
            <span className="bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 bg-clip-text text-transparent ">
              INK
            </span>
            <span className="text-slate-200">E</span>
          </Link>
          All rights reserved. - Inke.app
        </div>

        <Link
          className="mb-6 mt-2"
          href="https://www.producthunt.com/posts/inke?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-inke"
          target="_blank"
        >
          {isShowLocalHunt ? (
            <Image
              src="/product.svg"
              alt="Product Hunt"
              width={250}
              height={54}
            />
          ) : (
            <Image
              loader={imageLoader}
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.png?post_id=419235&theme=light"
              alt="Product Hunt"
              width={250}
              height={54}
              onError={(e) => {
                if (e) {
                  setShowLocalHunt(true);
                }
              }}
            />
          )}
        </Link>
      </div>

      <div className="flex flex-col gap-20 text-slate-200 sm:flex-row">
        <div className="flex flex-col items-start">
          <p className="mb-4 font-bold">Information</p>
          <Link
            className="font-mono text-sm text-slate-200 hover:text-slate-300"
            href="/pricing"
          >
            Pricing (beta for free)
          </Link>
          <Link
            className="my-2 font-mono text-sm text-slate-200 hover:text-slate-300"
            href="/document"
          >
            Document
          </Link>
          <Link
            className="font-mono text-sm text-slate-200 hover:text-slate-300"
            href="/privacy"
          >
            Privacy Policy
          </Link>
          <Link
            className="mt-2 font-mono text-sm text-slate-200 hover:text-slate-300"
            href="mailto:team@inke.app"
          >
            Contact us
          </Link>
        </div>

        <div className="flex flex-col items-start">
          <p className="mb-4 font-bold">Community</p>
          <Link
            className="font-mono text-sm text-slate-200"
            href="/feedback"
            target="_blank"
          >
            Feedback
          </Link>
          <Link
            className="my-2 font-mono text-sm text-slate-200"
            href="https://www.youtube.com/watch?v=Te3Piqtv1NQ"
            target="_blank"
          >
            Youtube
          </Link>
          <Link
            className="mb-2 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-purple-500 bg-clip-text text-sm font-semibold text-transparent hover:text-slate-300 "
            href="https://github.com/yesmore/inke"
            target="_blank"
          >
            Open Source{" "}
          </Link>

          <img
            src="https://img.shields.io/github/stars/yesmore/inke?style=social"
            alt="Github star"
            width="86"
            height="32"
          />
        </div>
      </div>
    </div>
  );
}
