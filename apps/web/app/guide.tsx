"use client";

import {
  Content_Guide_Storage_Key,
  Default_Debounce_Duration,
  defaultEditorGuideContent,
} from "@/lib/consts";
import NewPostButton from "@/ui/new-post-button";
import { Editor as InkeEditor } from "inke";
import { useEffect, useState } from "react";
import Image from "next/image";

export function Welcome() {
  return (
    <div className="grids mt-3 flex w-full max-w-[90%] flex-col items-center justify-center py-6">
      <p className="title-font animate-fade-up font-display mb-6 text-center text-3xl font-bold tracking-[-0.02em] text-slate-700 drop-shadow-sm md:mb-8 md:text-5xl">
        <span className="bg-gradient-to-r from-slate-400 via-slate-500 to-slate-800 bg-clip-text text-transparent ">
          Simple
        </span>
        , AI Powered,{" "}
        <span className="bg-gradient-to-r from-slate-800 via-slate-500 to-slate-400 bg-clip-text text-transparent ">
          Markdown
        </span>
      </p>

      <NewPostButton
        className="w-36 py-2 font-medium shadow-md md:w-44 md:px-3 md:text-lg "
        text="Start For Free"
      />
    </div>
  );
}

export function EditorGuide() {
  const [canRenderGuide, setCanRenderGuide] = useState(false);

  useEffect(() => {
    if (window) {
      localStorage.removeItem(Content_Guide_Storage_Key);
      setCanRenderGuide(true);
    }
  }, []);

  return (
    canRenderGuide && (
      <>
        <InkeEditor
          className="relative mb-3 w-full max-w-screen-lg overflow-y-auto border-stone-200 bg-white"
          storageKey={Content_Guide_Storage_Key}
          debounceDuration={Default_Debounce_Duration}
          defaultValue={defaultEditorGuideContent}
        />
        <Image
          className="-mt-12"
          alt={"example"}
          src={"/opengraph-image.png"}
          width={960}
          height={300}
        />
        <NewPostButton
          className="my-3 w-32 py-2 font-medium md:w-44 md:px-6 md:text-lg "
          text="Start For Free"
        />
      </>
    )
  );
}
