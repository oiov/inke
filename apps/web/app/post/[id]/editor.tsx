"use client";

import {
  useCallback,
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { Editor as InkeEditor } from "inkejs";
import { JSONContent } from "@tiptap/react";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import {
  Content_Storage_Key,
  Default_Debounce_Duration,
  Note_Storage_Key,
} from "@/lib/consts";
import { ContentItem } from "@/lib/types/note";
import {
  exportAsJson,
  exportAsMarkdownFile,
  fetcher,
  fomatTmpDate,
  timeAgo,
} from "@/lib/utils";
import Menu from "@/ui/menu";
import UINotFound from "@/ui/layout/not-found";
import { toPng } from "html-to-image";
import { usePDF } from "react-to-pdf";
import { Session } from "next-auth";
import { IResponse } from "@/lib/types/response";
import { Collaboration, ShareNote } from "@prisma/client";
import { LoadingCircle, LoadingDots } from "@/ui/shared/icons";
import { BadgeInfo, ExternalLink, Shapes, Clipboard } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {
  useCollaborationByLocalId,
  useCollaborationRoomId,
  useUserInfoByEmail,
  useUserShareNotes,
} from "./request";
import Link from "next/link";
import Tooltip from "@/ui/shared/tooltip";
import { useSearchParams } from "next/navigation";

export default function Editor({
  id,
  session,
  contents,
  setContents,
  setShowRoomModal,
}: {
  id?: string;
  session: Session | null;
  contents: ContentItem[];
  setContents: Dispatch<SetStateAction<ContentItem[]>>;
  setShowRoomModal: Dispatch<SetStateAction<boolean>>;
}) {
  const params = useSearchParams();
  const [collaboration, setCollaboration] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [debounceDuration, setDebounceDuration] = useState(
    Default_Debounce_Duration,
  );
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [isLoading, setLoading] = useState(true);
  const [isSharing, setSharing] = useState(false);
  const [isShowShareLink, setShowShareLink] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState("");

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentContent, setCurrentContent] = useLocalStorage<JSONContent>(
    Content_Storage_Key,
    {},
  );
  const [currentPureContent, setPureContent] = useState("");

  const { shares } = useUserShareNotes();
  const { user } = useUserInfoByEmail(session?.user.email);
  const { room, isLoading: isLoadingRoom } = useCollaborationRoomId(
    params.get("work"),
  );
  const { room: localRoom } = useCollaborationByLocalId(id);

  const { toPDF, targetRef } = usePDF({ filename: "note.pdf" });

  useEffect(() => {
    const roomId = params.get("work");
    if (roomId) {
      if (room && room.code === 200) {
        setCurrentRoomId(roomId);
        setCollaboration(true);
      }
      if (id && contents.length > 0) {
        const index = contents.findIndex((item) => item.id === id);
        if (index !== -1 && contents[index]) {
          setCurrentContent({});
          setCurrentIndex(index);
        }
      }
    } else {
      if (id && contents.length > 0) {
        setLoading(true);
        const index = contents.findIndex((item) => item.id === id);
        if (index !== -1 && contents[index]) {
          setCurrentContent(contents[index].content ?? {});
          setCurrentIndex(index);
        }
      }
    }
    setLoading(false);
  }, [id, contents, room]);

  const debouncedUpdates = useDebouncedCallback(
    async (value, text, markdown) => {
      handleUpdateItem(id, value);
      setPureContent(markdown);
    },
    debounceDuration,
  );

  const handleUpdateItem = (id: string, updatedContent: JSONContent) => {
    if (currentIndex !== -1) {
      // console.log(id, contents[currentIndex].title);

      const updatedList = [...contents];
      updatedList[currentIndex] = {
        ...updatedList[currentIndex],
        content: updatedContent,
        updated_at: new Date().getTime(),
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

  const handleExportMarkdown = () => {
    if (
      currentPureContent.length === 0 ||
      currentIndex === -1 ||
      saveStatus !== "Saved"
    )
      return;

    exportAsMarkdownFile(currentPureContent, contents[currentIndex].title);
  };

  const handleExportPDF = () => {
    toPDF();
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
      if (!isShowShareLink) setShowShareLink(true);
    }
    setSharing(false);
  };

  const handleCreateCollaboration = async () => {
    // 用户当前本地笔记是否已加入协作
    if (localRoom.code === 200) return;

    if (!currentRoomId) {
      setShowRoomModal(true);
    } else if (currentRoomId && !collaboration) {
      // url有roomid但是没有加入
      console.log("url有roomid但是没有加入", room);
    } else if (currentRoomId && collaboration) {
      // url有roomid且已经加入
      return;
    }
  };

  if (isLoading || (params.get("work") && isLoadingRoom))
    return (
      <div className="m-6">
        <LoadingCircle className="h-6 w-6" />
      </div>
    );

  if (params.get("work") && room.code !== 200)
    return (
      <>
        <div className="relative mx-auto h-screen w-full overflow-auto px-12 pt-12">
          <Shapes className="mx-auto h-12 w-12 text-purple-400 hover:text-slate-500" />
          <h1 className="my-4 text-center text-2xl font-semibold">
            Wrong collaboration space
          </h1>
          <p>
            You are accessing a multiplayer collaboration space, but there seems
            to be an unexpected issue:{" "}
            <span className="font-bold text-slate-800">{room.msg}</span>. Please
            check your space id (<strong>{params.get("work")}</strong>) and try
            it again.
          </p>
        </div>
      </>
    );

  return (
    <>
      <Toaster />
      <div className="relative flex h-screen w-full justify-center overflow-auto">
        <div className="bg-white/50 absolute z-10 mb-5 flex w-full items-center justify-end gap-2 px-3 py-2 backdrop-blur-xl">
          <span className="hidden text-xs text-slate-400 md:block">
            Created at
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
              {saveStatus === "Saved" &&
                currentIndex !== -1 &&
                timeAgo(contents[currentIndex].updated_at)}
            </span>
          </div>

          <Tooltip
            content={
              <div className="w-72 px-3 py-2 text-sm text-slate-400">
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold text-slate-500">
                    Collaborative Space
                  </h1>

                  {collaboration && room && room.data && (
                    <Clipboard
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `https://inke.app/invite/${room.data.id}`,
                        )
                      }
                      className="h-4 w-4 cursor-pointer text-purple-500 hover:text-slate-300 active:text-green-500 "
                    />
                  )}
                </div>

                {collaboration && room && room.data ? (
                  <p className="mt-2 hyphens-manual">
                    This note has enabled multi person collaboration, Copy the{" "}
                    <Link
                      className="text-blue-500 after:content-['_↗'] hover:text-blue-300"
                      href={`/invite/${room.data.id}`}
                      target="_blank"
                    >
                      invite link
                    </Link>{" "}
                    to invite others to join the collaboration.
                  </p>
                ) : localRoom && localRoom.code === 200 ? (
                  <p className="mt-2 hyphens-manual">
                    This local note is already associated with a collaboration
                    space. Click the link below to jump to the collaboration:{" "}
                    <Link
                      className="text-blue-500 after:content-['_↗'] hover:text-blue-300"
                      href={`/post/${id}?work=${localRoom.data.roomId}`}
                      target="_blank"
                    >
                      space-{localRoom.data.roomId}
                    </Link>
                  </p>
                ) : (
                  <p className="mt-2 hyphens-manual">
                    Now, Inke supports collaborative editing of docs by multiple
                    team members. Start by creating collaborative space (click
                    on the{" "}
                    <Shapes className="inline h-3 w-3 text-purple-400 hover:text-slate-500" />{" "}
                    icon). <br />
                    Of course, You need to{" "}
                    <strong className="text-slate-900">sign in first</strong> to
                    try this feature.
                  </p>
                )}
                <p className="mt-2 hyphens-manual font-semibold">
                  Please note that once you connect to the collaboration space,
                  your note content will be overwritten by the latest content in
                  the space.
                </p>
              </div>
            }
            fullWidth={false}
          >
            <div className=" flex items-center justify-center gap-2">
              {collaboration && room && room.data && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://inke.app/invite/${room.data.id}`,
                    );
                    toast("Copied to clipboard");
                  }}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Invite
                </button>
              )}
              <button className="mr-2" onClick={handleCreateCollaboration}>
                <Shapes className="h-5 w-5 text-purple-400 hover:text-purple-300" />
              </button>
            </div>
          </Tooltip>

          {((shares &&
            shares.data &&
            shares.data.find((i) => i.localId === id)) ||
            isShowShareLink) && (
            <Link href={`/publish/${id}`} target="_blank">
              <ExternalLink className="h-5 w-5 text-blue-500 hover:text-blue-300" />
            </Link>
          )}

          <button
            className="ml-1 flex h-7 w-20 items-center justify-center gap-1 rounded-md bg-blue-500 px-4 py-1 text-sm text-white transition-all hover:bg-blue-300"
            onClick={handleCreateShare}
            disabled={isSharing || saveStatus !== "Saved"}
          >
            {isSharing ? (
              <LoadingDots color="#fff" />
            ) : (
              <span className="bg-gradient-to-r from-red-100 via-yellow-200 to-orange-200 bg-clip-text font-semibold text-transparent">
                Publish
              </span>
            )}
          </button>

          <Tooltip
            content={
              <div className="w-64 px-3 py-2 text-sm text-slate-400">
                <h1 className="mb-2 font-semibold text-slate-500">
                  Publish and Share
                </h1>
                <p>
                  Click the <code>`Publish`</code> button to save your note
                  remotely and generate a sharing link, allowing you to share
                  your notes with others. Your notes will be uploaded after
                  serialization. e.g{" "}
                  <a
                    className="text-blue-500 after:content-['_↗'] hover:text-blue-300"
                    href="https://inke.app/publish/0e1be533-ae66-4ffa-9725-bd6b84899e78"
                    target="_blank"
                  >
                    link
                  </a>
                  .
                </p>
                <p>
                  You need to <strong>sign in</strong> first to try this
                  feature.
                </p>
              </div>
            }
            fullWidth={false}
          >
            <button className="hidden sm:block">
              <BadgeInfo className="h-4 w-4 text-slate-400 hover:text-slate-500" />
            </button>
          </Tooltip>

          <Menu
            onExportImage={handleExportImage}
            onExportJson={handleExportJson}
            onExportTxT={handleExportMarkdown}
            onExportPDF={handleExportPDF}
          />
        </div>

        {id && currentIndex === -1 && !isLoading && <UINotFound />}

        {contents && currentIndex !== -1 && (
          <div ref={ref} className="w-full max-w-screen-lg overflow-auto">
            <div ref={targetRef}>
              {params.get("work") ? (
                <InkeEditor
                  className="relative min-h-screen overflow-y-auto overflow-x-hidden border-stone-200 bg-white pt-1"
                  storageKey={Content_Storage_Key}
                  debounceDuration={debounceDuration}
                  defaultValue={currentContent}
                  plan={user?.plan || "5"}
                  bot={true}
                  id={params.get("work")}
                  collaboration={true}
                  userName={user?.name || "unknown"}
                  onUpdate={() => setSaveStatus("Unsaved")}
                  onDebouncedUpdate={(
                    json: JSONContent,
                    text: string,
                    markdown: string,
                  ) => {
                    setSaveStatus("Saving...");
                    if (json) debouncedUpdates(json, text, markdown);
                    setTimeout(() => {
                      setSaveStatus("Saved");
                    }, 500);
                  }}
                />
              ) : (
                <InkeEditor
                  className="relative min-h-screen overflow-y-auto overflow-x-hidden border-stone-200 bg-white pt-1"
                  storageKey={Content_Storage_Key}
                  debounceDuration={debounceDuration}
                  defaultValue={currentContent}
                  plan={user?.plan || "5"}
                  bot={true}
                  onUpdate={() => setSaveStatus("Unsaved")}
                  onDebouncedUpdate={(
                    json: JSONContent,
                    text: string,
                    markdown: string,
                  ) => {
                    setSaveStatus("Saving...");
                    if (json) debouncedUpdates(json, text, markdown);
                    setTimeout(() => {
                      setSaveStatus("Saved");
                    }, 500);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
