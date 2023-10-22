"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut, UserCog, ShieldCheck, Settings, Mail } from "lucide-react";
import Popover from "@/ui/shared/popover";
import Image from "next/image";
import { Session } from "next-auth";
import { generateName, greeting } from "@/lib/utils";
import { useUserInfoByEmail } from "@/app/post/[id]/request";
import { useRouter } from "next/navigation";

export default function UserDropdown({
  className,
  session,
  setShowEditModal,
}: {
  className?: string;
  session: Session;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { email } = session?.user || {};
  const { user } = useUserInfoByEmail(session?.user?.email || "");
  const [openPopover, setOpenPopover] = useState(false);

  if (!email) return null;

  return (
    <div className={className + " relative inline-block text-left"}>
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-[270px]">
            {user && (
              <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100">
                <span className="truncate font-semibold text-slate-700">
                  {greeting()}, {user?.name || `${generateName(user.id || "")}`}
                </span>
              </button>
            )}
            <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100">
              <Mail className="h-4 w-4" />
              <span className="truncate text-sm">{email}</span>
            </button>

            <hr className="my-2" />

            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => {
                router.push("/pricing");
              }}
            >
              <ShieldCheck
                className={
                  user?.plan !== "0"
                    ? "h-4 w-4 text-blue-500"
                    : "h-4 w-4 text-yellow-500"
                }
              />
              <span
                className={
                  "text-sm " + (user?.plan !== "0" ? "" : "text-yellow-500")
                }
              >
                {user && (
                  <span className="text-sm">
                    {user?.plan !== "0" ? "Actived plan" : "Upgrade to Premium"}
                  </span>
                )}
              </span>
            </button>

            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => {
                setShowEditModal(true);
                setOpenPopover(false);
              }}
            >
              <UserCog className="h-4 w-4" />
              <span className="text-sm">Edit nickname</span>
            </button>

            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => {
                router.push("/settings");
              }}
            >
              <Settings className="h-4 w-4" />
              <span className="text-sm">Preferences</span>
            </button>

            <hr className="my-2" />

            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Sign out</span>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-yellow-50 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={user && user.image ? user.image : "/cat.png"}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}
