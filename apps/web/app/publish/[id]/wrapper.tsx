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
import { Editor as InkeEditor } from "inke";
import { JSONContent } from "@tiptap/react";
import UINotFound from "../../../ui/layout/not-found";
import { timeAgo } from "@/lib/utils";

export default function Wrapper({
  id,
  session,
}: {
  id: string;
  session: Session | null;
}) {
  const { share, isLoading } = useShareNoteByLocalId(id);
  const [canRenderGuide, setCanRenderGuide] = useState(false);
  const [currentContent, setCurrentContent] = useState<JSONContent>({});

  const { user } = useUserInfoById(share?.data.userId);

  useEffect(() => {
    if (window) {
      localStorage.removeItem(Content_Public_Storage_Key);
    }
  }, []);

  useEffect(() => {
    if (share && share.data && share.data.data) {
      setCurrentContent(JSON.parse(share.data.data || "{}").content);
      setCanRenderGuide(true);
    }
  }, [share]);

  return (
    <div className=" min-h-screen">
      {isLoading && <>Loading...</>}
      {!isLoading && share && share.data && canRenderGuide && (
        <>
          {user && (
            <div className="mx-6">
              <span className="font-semibold text-slate-700">{user.name}</span>{" "}
              <span className="text-xs text-slate-500">
                Published at {share.data.createdAt.toString().slice(0, 10)}
              </span>
              {/* {timeAgo(share.data.createdAt.getTime() || 0)} */}
            </div>
          )}
          <InkeEditor
            className=" relative mb-3 w-screen max-w-screen-lg overflow-y-auto border-stone-200 bg-white"
            storageKey={Content_Public_Storage_Key}
            debounceDuration={Default_Debounce_Duration}
            defaultValue={currentContent}
          />
        </>
      )}
      {!isLoading && !share.data && <UINotFound />}
    </div>
  );
}
