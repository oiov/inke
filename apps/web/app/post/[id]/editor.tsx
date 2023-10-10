"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { Editor as InkeEditor } from "inke";
import { JSONContent } from "@tiptap/react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import {
  Content_Storage_Key,
  Default_Debounce_Duration,
  Note_Storage_Key,
} from "@/lib/consts";
import { ContentItem } from "@/lib/types/note";
import {
  exportAsJson,
  exportAsTxtFile,
  fetcher,
  fomatTmpDate,
  timeAgo,
} from "@/lib/utils";
import Menu from "@/ui/menu";
import UINotFound from "@/ui/layout/not-found";
import { toPng } from "html-to-image";
import { Session } from "next-auth";
import { IResponse } from "@/lib/types/response";
import { ShareNote } from "@prisma/client";
import { LoadingCircle, LoadingDots } from "@/ui/shared/icons";
import { ExternalLink, UploadCloud } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useUserShareNotes } from "./request";
import Link from "next/link";

export default function Editor({
  id,
  session,
}: {
  id?: string;
  session: Session | null;
}) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [debounceDuration, setDebounceDuration] = useState(
    Default_Debounce_Duration,
  );
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [isLoading, setLoading] = useState(true);
  const [isSharing, setSharing] = useState(false);
  const [contents, setContents] = useLocalStorage<ContentItem[]>(
    Note_Storage_Key,
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentContent, setCurrentContent] = useLocalStorage<JSONContent>(
    Content_Storage_Key,
    {},
  );
  const [currentPureContent, setPureContent] = useState("");

  const { shares } = useUserShareNotes();

  useEffect(() => {
    if (id && contents.length > 0) {
      setLoading(true);
      const index = contents.findIndex((item) => item.id === id);
      if (index !== -1 && contents[index]) {
        setCurrentContent(contents[index].content ?? {});
        setCurrentIndex(index);
      }
    }
    setLoading(false);
  }, [id, contents]);

  const debouncedUpdates = useDebouncedCallback(async (value, text) => {
    handleUpdateItem(id, value);
    setPureContent(text);
  }, debounceDuration);

  const handleUpdateItem = (id: string, updatedContent: JSONContent) => {
    if (currentIndex !== -1) {
      const updatedList = [...contents];
      updatedList[currentIndex] = {
        id: id,
        title: updatedList[currentIndex].title,
        content: updatedContent,
        updated_at: new Date().getTime(),
        created_at: updatedList[currentIndex].created_at,
      };
      setContents(updatedList);
    }
  };

  const handleExportImage = useCallback(() => {
    if (ref.current === null || currentIndex === -1 || saveStatus !== "Saved") {
      return;
    }

    toPng(ref.current, {
      cacheBust: true,
      width: ref.current.scrollWidth,
      height: ref.current.scrollHeight,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = contents[currentIndex].title + ".png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref, currentIndex, contents]);

  const handleExportJson = () => {
    if (!contents || currentIndex === -1 || saveStatus !== "Saved") return;
    exportAsJson(contents[currentIndex], contents[currentIndex].title);
  };

  const handleExportTxT = () => {
    if (
      currentPureContent.length === 0 ||
      currentIndex === -1 ||
      saveStatus !== "Saved"
    )
      return;
    exportAsTxtFile(currentPureContent, contents[currentIndex].title);
  };

  const handleCreateShare = async () => {
    if (saveStatus !== "Saved") return;
    setSharing(true);
    const res = await fetcher<IResponse<ShareNote | null>>("/api/share", {
      method: "POST",
      body: JSON.stringify({
        data: contents[currentIndex],
      }),
    });
    if (res.code !== 200) {
      toast(res.msg, {
        icon: "😅",
      });
    } else {
      toast.success(res.msg, {
        icon: "🎉",
      });
    }
    setSharing(false);
  };

  if (isLoading)
    return (
      <div className="m-6 flex w-full items-center justify-center">
        <LoadingCircle className="h-6 w-6" />
      </div>
    );

  return (
    <>
      <Toaster />
      <div className="relative flex h-screen w-full justify-center overflow-auto">
        <div className="bg-white/50 absolute z-10 mb-5 flex w-full items-center justify-end gap-2 px-3 py-2 backdrop-blur-xl">
          <span className="hidden text-xs text-slate-400 md:block">
            Created at{" "}
            {currentIndex !== -1 &&
              fomatTmpDate(contents[currentIndex].created_at)}
          </span>

          <div className="mr-auto flex items-center justify-center gap-2 rounded-lg bg-stone-100 px-2 py-1 text-sm ">
            <i
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                backgroundColor:
                  saveStatus === "Saved"
                    ? "#00d2ee"
                    : saveStatus === "Saving..."
                    ? "#ff6b2c"
                    : "#919191",
                display: "block",
                transition: "all 0.5s",
              }}
            />
            <span className="text-xs text-slate-400 transition-all">
              {saveStatus}{" "}
              {currentIndex !== -1 &&
                timeAgo(contents[currentIndex].updated_at)}
            </span>
          </div>

          {shares &&
            shares.data &&
            shares.data.find((i) => i.localId === id) && (
              <Link href={`/publish/${id}`} target="_blank">
                <ExternalLink className="h-4 w-4 text-blue-500 hover:text-blue-300" />
              </Link>
            )}

          <button
            className="ml-1 flex h-7 w-20 items-center justify-center gap-1 rounded-md bg-blue-500 px-4 py-1 text-sm text-white hover:bg-blue-300"
            onClick={handleCreateShare}
            disabled={isSharing || saveStatus !== "Saved"}
          >
            {isSharing ? <LoadingDots color="#fff" /> : "Publish"}
          </button>

          <Menu
            onExportImage={handleExportImage}
            onExportJson={handleExportJson}
            onExportTxT={handleExportTxT}
          />
        </div>

        {id && currentIndex === -1 && !isLoading && <UINotFound />}

        {contents && currentIndex !== -1 && (
          <div ref={ref} className="w-full max-w-screen-lg overflow-auto">
            <InkeEditor
              className="relative overflow-y-auto overflow-x-hidden border-stone-200 bg-white pt-1"
              storageKey={Content_Storage_Key}
              debounceDuration={debounceDuration}
              defaultValue={currentContent}
              onUpdate={() => {
                setSaveStatus("Unsaved");
              }}
              onDebouncedUpdate={(json: JSONContent, text: string) => {
                setSaveStatus("Saving...");
                if (json) debouncedUpdates(json, text);
                setTimeout(() => {
                  setSaveStatus("Saved");
                }, 500);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
