"use client";

import { Session } from "next-auth";
import Giscus from "@giscus/react";

export default function Wrapper({ session }: { session: Session | null }) {
  return (
    <>
      <div className="mx-auto min-h-screen max-w-3xl px-6">
        <Giscus
          id="feedback"
          repo="yesmore/inke"
          repoId="R_kgDOKYZChQ"
          category="Q&A"
          categoryId="DIC_kwDOKYZChc4CZ8wk"
          mapping="title"
          term="Welcome to Inke!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="en"
          loading="lazy"
        />
      </div>
    </>
  );
}
