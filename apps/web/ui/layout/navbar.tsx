"use client";

import Link from "next/link";
import Image from "next/image";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { Suspense } from "react";
import { useEditNicknameModal } from "./edit-nickname-modal";
import Logo from "../shared/icons/logo";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { EditModal, setShowEditModal } = useEditNicknameModal(session);
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <EditModal />
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled
            ? "bg-white/50 border-b border-gray-200 backdrop-blur-xl"
            : "bg-white/0"
        } z-[9999] transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <div className="flex gap-2">
            <Link
              href="/"
              className="font-display flex flex-col items-center justify-center text-xl"
            >
              <Logo className="h-5 w-5" />
            </Link>
            <Link href="/" className="font-bold">
              <span className="bg-gradient-to-r from-slate-400 via-slate-600 to-slate-800 bg-clip-text text-transparent ">
                INK
              </span>
              <span>E</span>
            </Link>
          </div>

          <Suspense>
            <div className="flex items-center justify-center gap-4">
{/*               <Link
                href="https://www.producthunt.com/products/inke?utm_source=badge-follow&utm_medium=badge&utm_souce=badge-inke"
                target="_blank"
              >
                <Image
                  src="/follow.svg"
                  alt="Inke | Product Hunt"
                  width="86"
                  height="32"
                />
              </Link> */}
              <Link
                className="text-slate-600 transition-all hover:text-slate-300"
                href={"/feedback"}
              >
                feedback
              </Link>

              {session ? (
                <UserDropdown
                  session={session}
                  setShowEditModal={setShowEditModal}
                />
              ) : (
                <button
                  className="bg-gradient-to-r from-slate-400 via-slate-600 to-slate-800 bg-clip-text px-3 py-1.5 text-sm font-semibold text-transparent transition-all hover:text-slate-300"
                  onClick={() => setShowSignInModal(true)}
                >
                  Sign in
                </button>
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
}
