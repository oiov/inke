"use client";

import {
  useShareNoteByLocalId,
  useUserInfoById,
} from "@/app/post/[id]/request";
import {
  Content_Public_Storage_Key,
  Default_Debounce_Duration,
} from "@/lib/consts";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { Editor as InkeEditor } from "inkejs";
import { JSONContent } from "@tiptap/react";
import UINotFound from "../../../ui/layout/not-found";
import { LoadingCircle } from "@/ui/shared/icons";
import NewPostButton from "@/ui/new-post-button";
import Image from "next/image";
import { BadgeInfo } from "lucide-react";
import Tooltip from "@/ui/shared/tooltip";
import { fetcher, nFormatter, timeAgo } from "@/lib/utils";
import { ContentItem } from "@/lib/types/note";

export default function Wrapper({
  id,
  session,
}: {
  id: string;
  session: Session | null;
}) {
  const { share, isLoading } = useShareNoteByLocalId(id);
  const [canRenderGuide, setCanRenderGuide] = useState(false);
  const [parseContent, setParseContent] = useState<ContentItem>();
  const [currentContent, setCurrentContent] = useState<JSONContent>({});

  const { user } = useUserInfoById(share?.data.userId);

  useEffect(() => {
    if (window) {
      localStorage.removeItem(Content_Public_Storage_Key);
    }
  }, []);

  useEffect(() => {
    if (share && share.data && share.data.data) {
      const parsed = JSON.parse(share.data.data || "{}");
      setParseContent(parsed);
      setCurrentContent(parsed.content);
      setCanRenderGuide(true);
      const title = parsed.title || "Untitled";
      document.title = `${title} | Inke`;
    }
  }, [share]);

  const handleUpdateKeeps = async () => {
    if (share && share.data) {
      await fetcher("/api/share/update/keep", {
        method: "POST",
        body: JSON.stringify({ id: share.data.id }),
      });
    }
  };

  return (
    <div className="min-h-screen">
      {isLoading && <LoadingCircle className="mx-auto h-6 w-6" />}
      {!isLoading && share && share.data && canRenderGuide && (
        <>
          {user && (
            <div className="mx-8 flex h-24 items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  alt="avatar"
                  src={user && user.image ? user.image : "/cat.png"}
                  width={50}
                  height={50}
                />
                <div className="flex flex-col justify-between gap-1">
                  <span className="cursor-pointer font-semibold text-slate-700">
                    {user.name}
                  </span>

                  <p className="flex text-xs text-slate-500">
                    <strong>{nFormatter(share.data.click ?? 0)}</strong>
                    &nbsp;clicks,&nbsp;
                    <strong>{nFormatter(share.data.keeps ?? 0)}</strong>&nbsp;keeps
                    {parseContent.created_at && (
                      <span className="ml-2 hidden border-l border-slate-300 pl-2 text-xs text-slate-500 sm:block">
                        Updated {timeAgo(parseContent.updated_at)}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <NewPostButton
                  className="h-8 w-28 px-3 py-1"
                  text="Keep writing"
                  from="publish"
                  defaultContent={currentContent}
                  callback={handleUpdateKeeps}
                />
                <Tooltip
                  content={
                    <div className="w-64 px-3 py-2 text-sm text-slate-400">
                      <h1 className="mb-2 font-semibold text-slate-500">
                        What&apos;s keep writing?
                      </h1>
                      <p>
                        Keep writing allows you to quickly create a note with
                        the same content as this note locally.
                      </p>
                    </div>
                  }
                  fullWidth={false}
                >
                  <button className="hidden sm:block">
                    <BadgeInfo className="h-4 w-4 text-slate-400 hover:text-slate-500" />
                  </button>
                </Tooltip>
              </div>
            </div>
          )}
          <InkeEditor
            className="relative -mt-6 mb-3 w-screen max-w-screen-lg overflow-y-auto border-stone-200 bg-white"
            storageKey={Content_Public_Storage_Key}
            debounceDuration={Default_Debounce_Duration}
            defaultValue={currentContent}
            editable={false}
            bot={true}
          />
        </>
      )}
      {!isLoading && !share.data && <UINotFound />}
    </div>
  );
}
