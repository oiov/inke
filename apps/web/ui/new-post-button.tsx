"use client";

import { v4 as uuidv4 } from "uuid";
import { Note_Storage_Key, defaultEditorContent } from "@/lib/consts";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { ContentItem } from "@/lib/types/note";
import { useState } from "react";
import { LoadingDots } from "./shared/icons";

export default function NewPostButton({
  className,
  text,
  from = "home",
}: {
  className?: string;
  text: string;
  from?: "home" | "post";
}) {
  const router = useRouter();
  const [clickNew, setClickNew] = useState(false);
  const [contents, setContents] = useLocalStorage<ContentItem[]>(
    Note_Storage_Key,
    [],
  );

  const handleClick = () => {
    if (from === "post" || contents.length === 0) {
      handleNewNote();
    } else if (from === "home" && contents.length > 0) {
      handleHistoryNote();
    }
  };

  const handleHistoryNote = () => {
    setClickNew(true);
    router.push(
      `/post/${contents.sort((a, b) => b.updated_at - a.updated_at)[0].id}`,
    );
  };
  const handleNewNote = () => {
    setClickNew(true);
    const id = uuidv4();
    const newest_list = JSON.parse(
      localStorage.getItem(Note_Storage_Key) || "[]",
    );
    const date = new Date();
    const newItem: ContentItem = {
      id,
      title: `Untitled-${id.slice(0, 6)}-${
        date.getMonth() + 1
      }/${date.getDate()}`,
      content: defaultEditorContent,
      tag: "",
      created_at: date.getTime(),
      updated_at: date.getTime(),
    };
    setContents([...newest_list, newItem]);
    router.push(`/post/${newItem.id}`);
  };

  return (
    <>
      <button
        className={
          className +
          " flex items-center justify-center rounded-md bg-blue-500 px-3 text-center text-sm text-slate-100 transition-all hover:bg-blue-300"
        }
        onClick={handleClick}
        disabled={clickNew}
      >
        {clickNew ? <LoadingDots color="#fff" /> : text}
      </button>
    </>
  );
}
