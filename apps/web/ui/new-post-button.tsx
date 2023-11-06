"use client";

import { v4 as uuidv4 } from "uuid";
import { defaultEditorContent } from "@/lib/consts";
import { useRouter } from "next/navigation";
import { ContentItem } from "@/lib/types/note";
import { useState } from "react";
import { LoadingDots } from "./shared/icons";
import { JSONContent } from "@tiptap/react";
import { Plus } from "lucide-react";
import { addNote, noteTable } from "@/store/db.model";
import { useLiveQuery } from "dexie-react-hooks";

export default function NewPostButton({
  className,
  text,
  from = "home",
  defaultContent = defaultEditorContent,
  isShowIcon = false,
  callback,
}: {
  className?: string;
  text: string;
  from?: "home" | "post" | "publish";
  defaultContent?: JSONContent;
  isShowIcon?: boolean;
  callback?: () => void;
}) {
  const router = useRouter();
  const [clickNew, setClickNew] = useState(false);
  const contents = useLiveQuery<ContentItem[]>(() => noteTable.toArray());

  const handleClick = () => {
    if (from === "post" || contents.length === 0) {
      handleNewNote();
    } else if (from === "home" && contents.length > 0) {
      handleHistoryNote();
    } else if (from === "publish") {
      handleNewNote();
      callback();
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
    const date = new Date();
    const newItem: ContentItem = {
      id,
      title: `Untitled-${id.slice(0, 6)}-${
        date.getMonth() + 1
      }/${date.getDate()}`,
      content: defaultContent,
      tag: "",
      created_at: date.getTime(),
      updated_at: date.getTime(),
    };
    addNote(newItem);
    router.push(`/post/${newItem.id}`);
  };

  return (
    <>
      <button
        className={
          className +
          " flex items-center justify-center gap-1 rounded-md bg-cyan-500 px-3 text-center text-sm text-slate-100 transition-all hover:opacity-80"
        }
        onClick={handleClick}
        disabled={clickNew}
      >
        {clickNew ? (
          <LoadingDots color="#fff" />
        ) : (
          <>
            {isShowIcon && (
              <Plus className="inline h-5 w-5 scale-95 text-slate-50" />
            )}
            {text}
          </>
        )}
      </button>
    </>
  );
}
