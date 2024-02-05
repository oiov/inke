"use client";

import NewPostButton from "@/ui/new-post-button";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { TypeAnimation } from "react-type-animation";
import Checked from "@/ui/shared/icons/checked";
import { Account_Plans } from "@/lib/consts";
import { CardItem } from "./card";
import { motion } from "framer-motion";

export function Welcome() {
  return (
    <div className="grids mt-3 flex w-full max-w-6xl flex-col items-center justify-center py-6">
      <p className="title-font animate-fade-up font-display text-center text-3xl font-bold tracking-[-0.02em] text-slate-700 drop-shadow-sm md:text-5xl">
        <span className="bg-gradient-to-r from-slate-400 via-slate-500 to-slate-800 bg-clip-text text-transparent ">
          Lightweight
        </span>{" "}
        . <br className="block sm:hidden" />
        AI Powered . <br className="block sm:hidden" />
        <span className="bg-gradient-to-r from-slate-800 via-slate-500 to-slate-400 bg-clip-text text-transparent ">
          Markdown
        </span>
      </p>

      <p className="mx-auto mb-6 mt-3 w-[270px] text-center font-mono text-lg font-semibold text-slate-600 md:mt-5 md:w-full">
        <TypeAnimation
          className="w-[320px]"
          sequence={[
            "AI notebook, empowering writing.",
            1000,
            "AI notebook, empowering editing.",
            1000,
            "AI notebook, empowering translation.",
            1000,
            "AI notebook, empowering collaboration.",
            1000,
            "AI notebook, empowering anything.",
            3000,
          ]}
          preRenderFirstString={true}
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

        <div className="my-14 flex flex-col items-center justify-around gap-10 md:flex-row">
          <Image
            className="rounded-lg shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
            alt={"example"}
            src="/e2.png"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAACCSURBVBhXZYzBCgIxDEQnTdPau+hveBB/XtiLn+NJQdoNS2Orq6zuO0zgZRhSVbvegeAJGx7hvUeMAUSEzu1RUesEKuNkIgyrFaoFzB4i8i1+cDEwXHOuRc65lbVpe38XuPm+YMdIKa3WOj9F60vWcj0IOg8Xy7ngdDxgv9vO+h/gCZNAKuSRdQ2rAAAAAElFTkSuQmCC"
            width={430}
            height={280}
          />
          <div className="grids px-2 py-4">
            <h3 className="mb-6 text-xl font-bold md:text-3xl">
              Online Collaboration
            </h3>
            <p className="text-lg">
              👨‍👩‍👦 One click to start real-time online collaboration among
              multiple people.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-around gap-10 md:flex-row-reverse">
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
      </div>

      <div className="grids mt-10 flex w-full max-w-6xl items-center justify-center gap-8 pb-6 pt-6 md:gap-14 md:pb-10 md:pt-10">
        <CardItem
          bgColor="bg-cyan-400"
          rotate="rotate-12 origin-top-left"
          icon={"✏️"}
        />
        <CardItem bgColor="bg-orange-400" rotate="rotate-45" icon="👻" />
        <CardItem rotate="rotate-12 origin-top-left" icon={"💯"} />
        <CardItem bgColor="bg-pink-400" rotate="-rotate-12" icon="🎓" />
      </div>

      <NewPostButton
        className="my-10 h-10 w-36 py-2 font-medium shadow-md md:h-12 md:w-44 md:px-3 md:text-lg"
        text="Start writing now"
      />
    </>
  );
}
