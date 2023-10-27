"use client";

import NewPostButton from "@/ui/new-post-button";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { TypeAnimation } from "react-type-animation";
import Checked from "@/ui/shared/icons/checked";
import { Account_Plans } from "@/lib/consts";

export function Welcome() {
  return (
    <div className="grids mt-3 flex w-full max-w-6xl flex-col items-center justify-center py-6">
      <p className="title-font animate-fade-up font-display text-center text-3xl font-bold tracking-[-0.02em] text-slate-700 drop-shadow-sm md:text-5xl">
        <span className="bg-gradient-to-r from-slate-400 via-slate-500 to-slate-800 bg-clip-text text-transparent ">
          Simple
        </span>
        , AI Powered,{" "}
        <span className="bg-gradient-to-r from-slate-800 via-slate-500 to-slate-400 bg-clip-text text-transparent ">
          Markdown
        </span>
      </p>

      <p className="mx-auto mb-6 mt-3 text-center font-mono text-lg font-semibold text-slate-600 md:mt-5 md:w-full">
        <TypeAnimation
          className="w-[320px]"
          sequence={[
            "AI notebook, empowering writing.",
            1000,
            "AI notebook, empowering editing.",
            1000,
            "AI notebook, empowering translation.",
            1000,
            "AI notebook, chat with note.",
            1000,
            "AI notebook, all in one.",
            3000,
          ]}
          speed={50}
          repeat={5}
        />
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
            src="/desktop.png"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAACCSURBVBhXZYzBCgIxDEQnTdPau+hveBB/XtiLn+NJQdoNS2Orq6zuO0zgZRhSVbvegeAJGx7hvUeMAUSEzu1RUesEKuNkIgyrFaoFzB4i8i1+cDEwXHOuRc65lbVpe38XuPm+YMdIKa3WOj9F60vWcj0IOg8Xy7ngdDxgv9vO+h/gCZNAKuSRdQ2rAAAAAElFTkSuQmCC"
            width={430}
            height={280}
          />
          <div className="grids px-2 py-4">
            <h3 className="mb-6 text-xl font-bold md:text-3xl">
              Rich editing components
            </h3>
            <p className="text-lg">
              📖 Integrate rich text, Markdown, and final render with JSON.
            </p>
          </div>
        </div>

        <div className="my-14 flex flex-col items-center justify-around gap-10 md:flex-row-reverse">
          <Image
            className="rounded-lg shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
            alt={"example"}
            src="/e1.png"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAACCSURBVBhXZYzBCgIxDEQnTdPau+hveBB/XtiLn+NJQdoNS2Orq6zuO0zgZRhSVbvegeAJGx7hvUeMAUSEzu1RUesEKuNkIgyrFaoFzB4i8i1+cDEwXHOuRc65lbVpe38XuPm+YMdIKa3WOj9F60vWcj0IOg8Xy7ngdDxgv9vO+h/gCZNAKuSRdQ2rAAAAAElFTkSuQmCC"
            width={450}
            height={280}
          />
          <div className="grids px-2 py-4">
            <h3 className="mb-6 text-xl font-bold md:text-3xl">
              AI empowering writing
            </h3>
            <p className="text-lg">
              🎉 Continue writing, editing, translation, chat with AI, all in
              one.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-around gap-10 md:flex-row">
          <Image
            className="rounded-lg shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
            alt={"example"}
            src="/e3.png"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAACCSURBVBhXZYzBCgIxDEQnTdPau+hveBB/XtiLn+NJQdoNS2Orq6zuO0zgZRhSVbvegeAJGx7hvUeMAUSEzu1RUesEKuNkIgyrFaoFzB4i8i1+cDEwXHOuRc65lbVpe38XuPm+YMdIKa3WOj9F60vWcj0IOg8Xy7ngdDxgv9vO+h/gCZNAKuSRdQ2rAAAAAElFTkSuQmCC"
            width={460}
            height={280}
          />
          <div className="grids px-2 py-4">
            <h3 className="mb-6 text-xl font-bold md:text-3xl">
              Export & Theme
            </h3>
            <p className="text-lg">
              🍥 One click simple export of PDF, images, Markdown, Json files
            </p>
          </div>
        </div>

        <h1 className="my-12 text-center text-4xl font-bold">PLAN</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            className={
              "dark:bg-zinc-850 relative flex flex-col justify-between rounded-lg border border-gray-300 bg-white p-6 shadow-lg"
            }
          >
            <div>
              <h3 className="text-center text-2xl font-bold">Free</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">
                  ${Account_Plans[0].pay}
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center">
                  <Checked />
                  Unlimited number of local notes
                </li>
                <li className="flex items-center">
                  <Checked />
                  {Account_Plans[0].note_upload_count} notes upload to Cloud
                </li>
                <li className="flex items-center">
                  <Checked />
                  AI generates {Account_Plans[0].ai_generate_day} times per day
                </li>
                <li className="flex items-center">
                  <Checked />
                  AI generates up to {Account_Plans[0].ai_generate_chars}{" "}
                  characters per time
                </li>
                <li className="flex items-center">
                  <Checked />
                  Less than {Account_Plans[0].image_upload_size}MB for upload
                  image per time
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <button className="w-full rounded-lg bg-black px-3 py-2 font-semibold text-slate-100 shadow-md">
                Sign in for free
              </button>
            </div>
          </div>

          <div
            className={
              "dark:bg-zinc-850 relative flex flex-col justify-between rounded-lg border-2 border-purple-500 bg-white p-6 shadow-lg"
            }
          >
            <div className="absolute left-1/2 top-0 inline-block -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1 text-sm text-slate-100">
              Beta for free
            </div>
            <div>
              <h3 className="text-center text-2xl font-bold">Basic</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <p className="text-4xl font-bold">${Account_Plans[1].pay}</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center">
                  <Checked />
                  Unlimited number of local notes
                </li>
                <li className="flex items-center">
                  <Checked />
                  Unlimited number of Cloud notes
                </li>
                <li className="flex items-center">
                  <Checked />
                  AI generates {Account_Plans[1].ai_generate_day} times per day
                </li>
                <li className="flex items-center">
                  <Checked />
                  AI generates up to {Account_Plans[1].ai_generate_chars}{" "}
                  characters per time
                </li>
                <li className="flex items-center">
                  <Checked />
                  Less than {Account_Plans[1].image_upload_size}MB for upload
                  image per time
                </li>
                <li className="flex items-center">
                  <Checked />
                  All subsequent features will be used for free
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Link href={"/pricing"}>
                <button className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-2  font-semibold text-slate-100 shadow-md">
                  Apply for free
                </button>
              </Link>
            </div>
          </div>

          <div
            className={
              "dark:bg-zinc-850 relative flex flex-col justify-between rounded-lg border border-gray-300 bg-white p-6 shadow-lg"
            }
          >
            <div>
              <h3 className="text-center text-2xl font-bold">Premium</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <p className="text-4xl font-bold">${Account_Plans[2].pay}</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center">
                  <Checked />
                  Unlimited number of local notes
                </li>
                <li className="flex items-center">
                  <Checked />
                  Unlimited number of Cloud notes
                </li>
                <li className="flex items-center">
                  <Checked />
                  AI generates {Account_Plans[2].ai_generate_day} times per day
                </li>
                <li className="flex items-center">
                  <Checked />
                  AI generates up to {Account_Plans[2].ai_generate_chars}{" "}
                  characters per time
                </li>
                <li className="flex items-center">
                  <Checked />
                  Less than {Account_Plans[2].image_upload_size}MB for upload
                  image per time
                </li>
                <li className="flex items-center">
                  <Checked />
                  All subsequent features will be used for free
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <button className="w-full rounded-lg bg-black px-3 py-2 font-semibold text-slate-100 shadow-md">
                Coming soon
              </button>
            </div>
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
