"use client";

import {
  useCollaborationById,
  useCollaborationByRoomId,
  useCollaborationInviteCount,
} from "@/app/post/[id]/request";
import { Note_Storage_Key } from "@/lib/consts";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { ContentItem } from "@/lib/types/note";
import { IResponse } from "@/lib/types/response";
import { fetcher } from "@/lib/utils";
import UINotFound from "@/ui/layout/not-found";
import { LoadingCircle, LoadingDots } from "@/ui/shared/icons";
import { Collaboration, User } from "@prisma/client";
import { motion } from "framer-motion";
import { Shapes, Users } from "lucide-react";
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
  const { count } = useCollaborationInviteCount(room?.data?.roomId);

  const router = useRouter();
  const [contents, setContents] = useLocalStorage<ContentItem[]>(
    Note_Storage_Key,
    [],
  );
  const [isJoined, setIsJoined] = useState(false);
  const [isClickJoin, setClickJoin] = useState(false);
  const [creator, setCreator] = useState<User>();
  const [firstCreatedRoom, setFirstCreatedRoom] = useState<Collaboration>();

  useEffect(() => {
    if (room && room.code === 200) {
      // 查询第一个空间创建者
      onRequestCreator(room.data.roomId);
    }
  }, [room]);

  useEffect(() => {
    // console.log(room?.data);

    if (room && room.data) {
      const index = contents.findIndex((item) => item.id === room.data.localId);
      if (index !== -1) {
        setIsJoined(true);
      }
    }
  }, [contents, room]);

  const onRequestCreator = async (roomId: string) => {
    const res = await fetcher<IResponse<Collaboration>>(
      "/api/collaboration/room",
      {
        method: "POST",
        body: JSON.stringify({ roomId }),
      },
    );
    if (res.code === 200) {
      setFirstCreatedRoom(res.data);
      const user = await fetcher<User>(`/api/users?id=${res.data.userId}`);
      if (user) {
        setCreator(user);
      }
    }
  };

  const handleJoin = async () => {
    if (firstCreatedRoom && firstCreatedRoom.deletedAt) {
      toast("Space has been deleted");
      return;
    }

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

    if (res.code === 200) {
      toast.success(res.msg, {
        icon: "🎉",
      });
      newPost(localId);
      router.push(`/post/${localId}?work=${room.data.roomId}`);
    } else if (res.code === 301) {
      toast.success(res.msg, {
        icon: "🎉",
      });
      // 其他设备加入了
      const index = contents.findIndex((item) => item.id === room.data.localId);
      if (index === -1) {
        newPost(room.data.localId);
        router.push(`/post/${room.data.localId}?work=${room.data.roomId}`);
      } else {
        router.push(`/post/${localId}?work=${room.data.roomId}`);
      }
    } else {
      toast(res.msg);
      setClickJoin(false);
    }
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
    return (
      <div className="flex h-screen w-full justify-center px-6 py-6 text-center">
        <LoadingCircle className="h-6 w-6" />
      </div>
    );

  if (!id || room.code !== 200) return <UINotFound />;

  return (
    <>
      <Toaster />
      <div className="mx-auto h-screen max-w-3xl px-6 py-6 text-center">
        <Shapes className="mx-auto h-12 w-12 text-cyan-500 hover:text-slate-500" />
        <h1 className="my-4 text-center text-2xl font-semibold">
          🎉 Invite to Join Collaboration
        </h1>
        <p>You are being invited to join the collaboration space</p>

        <motion.div
          className="mx-auto mb-4 mt-6 w-80 rounded-lg border border-slate-100 p-3 text-sm shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <li className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span>Space name</span>
            <span className="font-semibold text-cyan-500">
              {room?.data?.title}
            </span>
          </li>
          <li className="flex items-center justify-between border-b border-slate-100 py-2">
            <span>Joined members</span>
            <span className="font-semibold">{count?.data || "-"}</span>
          </li>
          {creator && (
            <>
              <li className="flex items-center justify-between border-b border-slate-100 py-2">
                <span>Space owner</span>
                <span className="font-semibold">{creator.name}</span>
              </li>
            </>
          )}
          {firstCreatedRoom && (
            <>
              <li className="flex items-center justify-between border-b border-slate-100 py-2">
                <span>Created at</span>
                <span className="font-semibold">
                  {firstCreatedRoom.createdAt.toString().slice(0, 10)}
                </span>
              </li>
              <li className="flex items-center justify-between pt-2">
                <span>Space status</span>
                <span
                  className={
                    `${
                      firstCreatedRoom.deletedAt
                        ? "text-yellow-500"
                        : "text-green-500"
                    }` + " font-semibold"
                  }
                >
                  {firstCreatedRoom.deletedAt ? "Deleted" : "Active"}
                </span>
              </li>
            </>
          )}
        </motion.div>

        {isJoined ? (
          <button
            className="mx-auto mt-6 flex h-10 min-w-[200px] items-center justify-center rounded-md bg-blue-500 px-3 py-2 text-slate-50 shadow-md hover:bg-blue-400"
            disabled={isClickJoin}
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
            className="mx-auto mt-6 flex h-10 w-64 items-center justify-center rounded-md bg-blue-500 px-3 py-2 text-slate-50 shadow-md hover:bg-blue-400"
            onClick={handleJoin}
            disabled={isClickJoin}
          >
            {isClickJoin ? <LoadingDots color="#f6f6f6" /> : "Join Now"}
          </button>
        )}
      </div>
    </>
  );
}
