"use client";

import NewPostButton from "@/ui/new-post-button";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";

export function Welcome() {
  return (
    <div className="grids mt-3 flex w-full max-w-6xl flex-col items-center justify-center py-6">
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
        className="h-10 w-36 py-2 font-medium shadow-md md:h-12 md:w-44 md:px-3 md:text-lg"
        text="Start writing now"
      />
    </div>
  );
}

export function Landing({ session }: { session: Session | null }) {
  return (
    <>
      <div className="mt-12 w-full max-w-6xl px-6">
        <div className="flex flex-col items-center justify-around gap-10 md:flex-row">
          <Image
            className="rounded-lg shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
            alt={"example"}
            src={"/desktop.png"}
            width={430}
            height={450}
          />
          <div className="grids p-2">
            <h3 className="mb-6 text-xl font-bold md:text-3xl">
              Rich editing components
            </h3>
            <p className="text-lg">
              📖 Integrate rich text, Markdown, and render with JSON.
            </p>
          </div>
        </div>

        <div className="my-14 flex flex-col items-center justify-around gap-10 md:flex-row-reverse">
          <Image
            className="rounded-lg shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
            alt={"example"}
            src={
              "https://gcloud-1303456836.cos.ap-chengdu.myqcloud.com/inke/e1.png"
            }
            width={450}
            height={450}
          />
          <div className="grids p-2">
            <h3 className="mb-6 text-xl font-bold md:text-3xl">
              AI empowering writing
            </h3>
            <p className="text-lg">
              🎉 Continue writing, editing, translation, Chat with AI, all in
              one.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-around gap-10 md:flex-row">
          <Image
            className="rounded-lg shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
            alt={"example"}
            src={
              "https://gcloud-1303456836.cos.ap-chengdu.myqcloud.com/inke/e3.png"
            }
            width={460}
            height={450}
          />
          <div className="grids p-2">
            <h3 className="mb-6 text-xl font-bold md:text-3xl">
              Export & Theme
            </h3>
            <p className="text-lg">
              🍥 One click simple export of PDF, images, Markdown, Json files
            </p>
          </div>
        </div>
      </div>

      <NewPostButton
        className="my-10 h-10 w-36 py-2 font-medium shadow-md md:h-12 md:w-44 md:px-3 md:text-lg"
        text="Start writing now"
      />
    </>
  );
}
