"use client";

import { useCollaborationById } from "@/app/post/[id]/request";
import { Note_Storage_Key } from "@/lib/consts";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { ContentItem } from "@/lib/types/note";
import { IResponse } from "@/lib/types/response";
import { fetcher } from "@/lib/utils";
import UINotFound from "@/ui/layout/not-found";
import { LoadingDots } from "@/ui/shared/icons";
import { Collaboration } from "@prisma/client";
import { Shapes } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default function Wrapper({
  session,
  id,
}: {
  session: Session | null;
  id: string;
}) {
  const { room, isLoading } = useCollaborationById(id);
  const router = useRouter();
  const [contents, setContents] = useLocalStorage<ContentItem[]>(
    Note_Storage_Key,
    [],
  );
  const [isJoined, setIsJoined] = useState(false);
  const [isClickJoin, setClickJoin] = useState(false);

  useEffect(() => {
    if (room && room.data) {
      const index = contents.findIndex((item) => item.id === room.data.localId);
      if (index !== -1) {
        setIsJoined(true);
      }
    }
  }, [contents, room]);

  const handleJoin = async () => {
    setClickJoin(true);
    const localId = uuidv4();
    const res = await fetcher<IResponse<Collaboration | null>>(
      "/api/collaboration",
      {
        method: "POST",
        body: JSON.stringify({
          roomId: room.data.roomId,
          localId,
          title: room.data.title,
        }),
      },
    );

    if (res.code !== 200) {
      toast(res.msg, {
        icon: "😅",
      });
    } else if (res.code === 200) {
      toast.success(res.msg, {
        icon: "🎉",
      });
      newPost(localId);
      router.push(`/post/${localId}?work=${room.data.roomId}`);
    }
    setClickJoin(false);
  };

  const newPost = (localId: string) => {
    const newest_list = JSON.parse(
      localStorage.getItem(Note_Storage_Key) || "[]",
    );
    const date = new Date();
    const newItem: ContentItem = {
      id: localId,
      title: `Untitled-${localId.slice(0, 6)}-${
        date.getMonth() + 1
      }/${date.getDate()}`,
      content: {},
      tag: "",
      created_at: date.getTime(),
      updated_at: date.getTime(),
    };
    setContents([...newest_list, newItem]);
  };

  if (isLoading)
    return <div className="mx-auto h-screen max-w-3xl px-6 py-6">loading</div>;

  if (!id || !room) return <UINotFound />;

  return (
    <>
      <Toaster />
      <div className="mx-auto h-screen max-w-3xl px-6 py-6 text-center">
        <Shapes className="mx-auto h-12 w-12 text-purple-400 hover:text-slate-500" />
        <h1 className="my-4 text-center text-2xl font-semibold">
          🎉 Invite to Join Collaboration
        </h1>
        <p>
          You are being invited to join the collaboration space:{" "}
          <strong className=" text-blue-500">{room?.data?.title}</strong>
        </p>

        {isJoined ? (
          <button
            className="mx-auto mt-6 flex h-10 w-60 items-center justify-center rounded-md bg-blue-500 px-3 py-2 text-slate-50 shadow-md hover:bg-blue-400"
            onClick={() => {
              setClickJoin(true);
              router.push(
                `/post/${room.data.localId}?work=${room.data.roomId}`,
              );
            }}
          >
            {isClickJoin ? (
              <LoadingDots color="#f6f6f6" />
            ) : (
              "Joined, click for quick access"
            )}
          </button>
        ) : (
          <button
            className="mx-auto mt-6 flex h-10 w-24 items-center justify-center rounded-md bg-blue-500 px-3 py-2 text-slate-50 shadow-md hover:bg-blue-400"
            onClick={handleJoin}
          >
            {isClickJoin ? <LoadingDots color="#f6f6f6" /> : "Join Now"}
          </button>
        )}
      </div>
    </>
  );
}
