"use client";

import Checked from "@/ui/shared/icons/checked";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { useUserInfoByEmail } from "../post/[id]/request";
import Link from "next/link";
import { Account_Plans } from "@/lib/consts";

export default function Wrapper({ session }: { session: Session | null }) {
  const { user } = useUserInfoByEmail(session?.user?.email || "");

  const [currentPlan, setCurrentPlan] = useState("5");

  useEffect(() => {
    if (user && user.plan) {
      setCurrentPlan(user.plan);
    }
  }, [user]);

  return (
    <>
      <div className="mx-auto min-h-screen">
        <PlanCards activeIndex={currentPlan} />
      </div>
    </>
  );
}

export function PlanCards({ activeIndex }: { activeIndex: string }) {
  return (
    <section className="mt-3 flex w-full justify-center py-6 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container px-4 md:px-6">
        <h1 className=" text-center text-3xl font-bold">Choose your plan</h1>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            className={
              (activeIndex === "5"
                ? "border-2 border-purple-500"
                : "border border-gray-300") +
              " dark:bg-zinc-850 relative flex flex-col justify-between rounded-lg border bg-white p-6 shadow-lg"
            }
          >
            {activeIndex === "5" && (
              <div className="absolute left-1/2 top-0 inline-block -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1 text-sm text-slate-100">
                Current
              </div>
            )}
            <div>
              <h3 className="text-center text-2xl font-bold">Free for guest</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">$0</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center">
                  <Checked />
                  Unlimited number of local notes
                </li>
                <li className="flex items-center">
                  <Checked />
                  AI generates {Account_Plans[5].ai_generate_day} times per day
                </li>
                <li className="flex items-center">
                  <Checked />
                  AI generates up to {Account_Plans[5].ai_generate_chars}{" "}
                  characters per time
                </li>
                <li className="flex items-center">
                  <Checked />
                  Less than {Account_Plans[5].image_upload_size}MB for upload
                  image per time
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <button className="w-full rounded-lg bg-black px-3 py-2 font-semibold text-slate-100 shadow-md">
                Beta for free
              </button>
            </div>
          </div>

          <div
            className={
              (activeIndex === "0"
                ? "border-2 border-purple-500"
                : "border border-gray-300") +
              " dark:bg-zinc-850 relative flex flex-col justify-between rounded-lg border bg-white p-6 shadow-lg"
            }
          >
            {activeIndex === "0" && (
              <div className="absolute left-1/2 top-0 inline-block -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1 text-sm text-slate-100">
                Current
              </div>
            )}
            <div>
              <h3 className="text-center text-2xl font-bold">
                Free for registered
              </h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">$0</span>
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
                  Less than {Account_Plans[5].image_upload_size}MB for upload
                  image per time
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <button className="w-full rounded-lg bg-black px-3 py-2 font-semibold text-slate-100 shadow-md">
                Beta for free
              </button>
            </div>
          </div>

          <div
            className={
              (activeIndex === "1"
                ? "border-2 border-purple-500"
                : "border border-gray-300") +
              " dark:bg-zinc-850 relative flex flex-col justify-between rounded-lg bg-white p-6 shadow-lg"
            }
          >
            {activeIndex === "1" && (
              <div className="absolute left-1/2 top-0 inline-block -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1 text-sm text-slate-100">
                Current
              </div>
            )}
            <div>
              <h3 className="text-center text-2xl font-bold">Premium</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">$19</span>
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
              </ul>
            </div>
            <div className="mt-6">
              <Link href="/feedback" target="_blank">
                <button className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-2  font-semibold text-slate-100 shadow-md">
                  Apply for free
                </button>
              </Link>
            </div>
          </div>
        </div>

        <h3 className="mb-4 mt-10 text-lg font-semibold" id="about-plan">
          About Plan
        </h3>
        <div className=" text-sm">
          <p>
            Thank you for using our services! We would like to inform our
            non-registered users that there are limited usage quotas (Free for
            guest).
          </p>
          <p>
            We highly recommend you to register and unlock higher usage quotas
            (Free for registered).
          </p>
          <p className="my-2">
            🎉Exciting news! We have just introduced the Premium plan. And the
            best part is that Premium plan is currently available for free
            activation indefinitely! Simply give us a UPVOTE on{" "}
            <Link
              className="text-blue-500 after:content-['_↗'] hover:text-blue-300"
              href="https://www.producthunt.com/posts/inke"
              target="_blank"
            >
              Product Hunt
            </Link>
            or give a star on{" "}
            <Link
              className="text-blue-500 after:content-['_↗'] hover:text-blue-300"
              href="/github"
              target="_blank"
            >
              Github
            </Link>
            , and send an email named{" "}
            <strong>
              <code>Apply for Premium</code>
            </strong>{" "}
            to{" "}
            <strong>
              <code>songsonghhhh@gmail.com</code>
            </strong>{" "}
            , please include your registered email address (inke.app) and
            Product Hunt nickname or Github nickname in the email content .
          </p>
          <p>
            we will process your request within 1-2 business days. All you need
            to do is stay updated on the latest status of this page. Thank you
            for your continued support!
          </p>
        </div>
      </div>
    </section>
  );
}
