"use client";

import {
  useState,
  useEffect,
  Suspense,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { motion, useAnimation } from "framer-motion";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { ContentItem } from "@/lib/types/note";
import { Note_Storage_Key } from "@/lib/consts";
import { useRouter, useSearchParams } from "next/navigation";
import NewPostButton from "@/ui/new-post-button";
import UserDropdown from "@/ui/layout/user-dropdown";
import { Session } from "next-auth";
import { useCollaborationByUserId, useUserShareNotes } from "./request";
import Link from "next/link";
import { exportAsJson, fetcher } from "@/lib/utils";
import { Collaboration, ShareNote } from "@prisma/client";
import SearchInput from "@/ui/search-input";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  DownloadCloud,
  Edit,
  ExternalLink,
  Minus,
  Plus,
  Trash2,
  Shapes,
  FolderClosed,
  FolderOpen,
  FolderEdit,
} from "lucide-react";
import Tooltip from "@/ui/shared/tooltip";
import useWindowSize from "@/lib/hooks/use-window-size";
import toast from "react-hot-toast";

export default function Sidebar({
  id,
  session,
  contents,
  setContents,
  setShowSignInModal,
  setShowEditModal,
  setShowRoomModal,
}: {
  id?: string;
  session: Session | null;
  contents: ContentItem[];
  setContents: Dispatch<SetStateAction<ContentItem[]>>;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
  setShowRoomModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const { isMobile } = useWindowSize();

  const [active, setActive] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [showEditCate, setShowEditCate] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const controls = useAnimation();
  const controlText = useAnimation();
  const controlTitleText = useAnimation();

  const [contentsCache, setContentsCache] = useState<ContentItem[]>([]);
  const [categorizedData, setCategorizedData] = useState<{
    [key: string]: ContentItem[];
  }>();

  const { shares, isLoading } = useUserShareNotes();
  const [sharesCache, setSharesCache] = useState<ShareNote[]>([]);

  const { rooms } = useCollaborationByUserId();
  const [roomsCache, setRoomsCache] = useState<Collaboration[]>([]);

  const [openHistory, setOpenHistory] = useState(true);
  const [openShares, setOpenShares] = useState(false);
  const [openRooms, setOpenRooms] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const showMore = () => {
    controls.start({
      width: "270px",
      transition: { duration: 0.001 },
    });
    controlText.start({
      opacity: 1,
      display: "block",
      transition: { delay: 0.3 },
    });
    controlTitleText.start({
      opacity: 1,
      transition: { delay: 0.3 },
    });

    setActive(true);
  };

  const showLess = () => {
    controls.start({
      width: "0px",
      transition: { duration: 0.001 },
    });

    controlText.start({
      opacity: 0,
      display: "none",
    });

    controlTitleText.start({
      opacity: 0,
    });

    setActive(false);
  };

  useEffect(() => {
    // inputRef.current && inputRef.current?.focus();
  });

  useEffect(() => {
    showMore();
  }, []);

  useEffect(() => {
    if (isMobile) {
      showLess();
    }
  }, [isMobile]);

  useEffect(() => {
    if (searchKey === "") {
      setContentsCache(contents);
      setSharesCache(shares?.data || []);
      setCategorizedData(() => {
        return (
          contents
            // .sort((a, b) => b.updated_at - a.updated_at)
            .reduce((acc, item) => {
              const tag = item.tag || ""; // If tag is undefined, default it to an empty string
              if (!acc[tag]) {
                acc[tag] = [];
              }
              acc[tag].push(item);
              return acc;
            }, {} as { [key: string]: ContentItem[] })
        );
      });
    }
  }, [searchKey, contents, shares]);

  useEffect(() => {
    if (shares && shares.data) {
      setSharesCache(shares.data);
    }
  }, [shares]);

  useEffect(() => {
    if (rooms && rooms.data) {
      setRoomsCache(rooms.data);
    }
  }, [rooms]);

  const handleDeleteItem = (_id: string) => {
    const updatedList = contents.filter((item) => item.id !== _id);
    setContents(updatedList);
  };
  const handleDeletePublicItem = async (_id: string) => {
    const res = await fetcher(`/api/share?id=${_id}`, {
      method: "DELETE",
    });
    const updatedList = shares.data.filter((item) => item.id !== _id);
    setSharesCache(updatedList);
  };

  const handleEditTitle = (itemId: string) => {
    if (showEditInput && id === itemId) {
      setShowEditInput(false);
    } else {
      setShowEditInput(true);
    }
  };
  const handleChangeTitle = (value: string) => {
    const index = contents.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedList = [...contents];
      updatedList[index] = {
        ...updatedList[index],
        title: value,
      };
      setContents(updatedList);
    }
  };
  const handleEditCate = (itemId: string) => {
    if (showEditCate && id === itemId) {
      setShowEditCate(false);
      const index = contents.findIndex((item) => item.id === id);
      if (index !== -1) {
        const updatedList = [...contents];
        updatedList[index] = {
          ...updatedList[index],
          tag: inputRef.current.value,
        };
        setContents(updatedList);
      }
    } else {
      setShowEditCate(true);
    }
  };

  const handleExportJson = () => {
    if (!contents) return;
    exportAsJson(contents, "Inke-notes-local");
  };

  const handleInputSearch = (value: string) => {
    if (value.length > 0) {
      setSearchKey(value);
      const local_res = contents.filter((item) => {
        if (
          item.title.includes(value) ||
          JSON.stringify(item.content).includes(value) ||
          (item.tag && item.tag.includes(value))
        ) {
          return item;
        }
      });
      setContentsCache(local_res);
      setCategorizedData(() => {
        return (
          local_res
            // .sort((a, b) => b.updated_at - a.updated_at)
            .reduce((acc, item) => {
              const tag = item.tag || ""; // If tag is undefined, default it to an empty string
              if (!acc[tag]) {
                acc[tag] = [];
              }
              acc[tag].push(item);
              return acc;
            }, {} as { [key: string]: ContentItem[] })
        );
      });

      if (shares && shares.data) {
        const publish_res = shares.data.filter((item) => {
          if (item.data.includes(value)) {
            return item;
          }
        });
        setSharesCache(publish_res);
      }
    } else {
      setSearchKey("");
    }
  };

  const handleClickPublishNote = (publishId: string, localId: string) => {
    const localIndex = contentsCache.findIndex((i) => i.id === localId);
    if (localIndex !== -1) {
      router.push(`/post/${localId}`);
    } else {
      router.push(`/publish/${localId}`);
    }
  };

  const handleSyncPublisToLocal = (localId: string, remoteDate: string) => {
    const data = JSON.parse(remoteDate || "{}");
    if (remoteDate && data) {
      const newest_list = JSON.parse(
        localStorage.getItem(Note_Storage_Key) || "[]",
      );
      setContents([...newest_list, data]);
      router.push(`/post/${data.id}`);
    }
  };

  const handleQuitSpace = async (id: string, roomId: string) => {
    const res = await fetcher(`/api/collaboration?id=${id}`, {
      method: "DELETE",
    });

    if (res && res.code === 200) {
      toast("Exit space");
    }
  };

  const handleCreateSpace = () => {
    setShowRoomModal(true);
  };

  const handleToggleCollapse = (tag: string) => {
    setCategorizedData((prevData) => {
      const updatedData = { ...prevData };
      updatedData[tag].forEach((item) => {
        item.collapsed = !item.collapsed;
      });
      return updatedData;
    });
  };

  return (
    <div className="relative">
      <motion.div
        animate={controls}
        className={
          `${active ? "border-r" : ""}` +
          " animate group flex h-screen w-[270px] flex-col gap-3 overflow-y-auto border-slate-200/80 py-6 duration-300"
        }
      >
        {active && (
          <button
            onClick={showLess}
            className="absolute -right-4 top-28 z-[10] cursor-pointer rounded-r bg-slate-100 py-2 shadow transition-all hover:bg-slate-200 "
          >
            <ChevronLeft className="h-4 w-4 text-slate-400" />
          </button>
        )}
        {!active && (
          <button
            onClick={showMore}
            className="absolute -right-4 top-28 z-[10] cursor-pointer rounded-r bg-slate-100 py-2 shadow transition-all hover:bg-slate-200"
          >
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>
        )}

        <div className="mx-3 flex flex-col gap-2">
          <SearchInput onChange={handleInputSearch} />
          <div className="flex items-center justify-between gap-2">
            <NewPostButton
              isShowIcon={true}
              className="h-9 w-full shadow"
              text="Note"
              from="post"
            />
            <button
              className="flex h-9 w-full items-center justify-center gap-1 rounded-md bg-blue-500 px-3 text-center text-sm text-slate-100 shadow transition-all hover:bg-blue-300"
              onClick={handleCreateSpace}
            >
              <Shapes className="inline h-4 w-4 text-slate-50" /> Space
            </button>
          </div>
        </div>

        <div className="border-b border-slate-200/70" />

        <div className="h-[40%] w-full grow overflow-y-auto px-3">
          <div
            className="flex cursor-pointer items-center justify-between"
            onClick={() => {
              setOpenHistory(!openHistory);
            }}
          >
            <p className="font-mono text-sm font-semibold text-slate-400">
              History({contents.length})
            </p>
            <button className="rounded bg-slate-100 hover:bg-slate-200">
              {openHistory ? (
                <Minus className="h-5 w-5 cursor-pointer p-1 text-slate-500" />
              ) : (
                <Plus className="h-5 w-5 cursor-pointer p-1 text-slate-500" />
              )}
            </button>
          </div>

          {openHistory &&
            categorizedData &&
            Object.keys(categorizedData).map((tag) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                key={tag}
              >
                <h2
                  className={
                    `${
                      categorizedData[tag].findIndex((i) => i.id === id) !== -1
                        ? "text-blue-500"
                        : "text-gray-500"
                    }` +
                    " flex cursor-pointer items-center justify-start gap-1 pt-2 font-mono text-xs font-semibold transition-all  hover:text-slate-300"
                  }
                  onClick={() => handleToggleCollapse(tag)}
                >
                  {categorizedData[tag][0].collapsed ? (
                    <FolderOpen className="h-3 w-3 text-slate-400" />
                  ) : (
                    <FolderClosed className="h-3 w-3 text-slate-400" />
                  )}
                  {tag || "Uncategorized"}
                </h2>
                {categorizedData[tag][0].collapsed &&
                  categorizedData[tag].map((item) => (
                    <div
                      className="group/item my-2 mb-2 flex items-center justify-between gap-2 pl-4 transition-all"
                      key={item.id}
                    >
                      {showEditInput && id === item.id ? (
                        <input
                          type="text"
                          className="rounded border px-2 py-1 text-xs text-slate-500"
                          defaultValue={item.title}
                          onChange={(e) => handleChangeTitle(e.target.value)}
                          placeholder="Enter note title"
                        />
                      ) : showEditCate && id === item.id ? (
                        <input
                          ref={inputRef}
                          type="text"
                          className="rounded border px-2 py-1 text-xs text-slate-500"
                          defaultValue={item.tag}
                          // onChange={(e) => handleChangeCate(e.target.value)}
                          placeholder="Enter note category"
                        />
                      ) : (
                        <p
                          className={
                            "flex cursor-pointer items-center justify-start gap-2 truncate font-mono text-xs hover:opacity-80 " +
                            `${
                              id === item.id ? "text-blue-500" : "text-gray-500"
                            }`
                          }
                          onClick={() => router.push(`/post/${item.id}`)}
                        >
                          {item.title.length > 0 ? item.title : "Untitled"}
                        </p>
                      )}

                      <div className="ml-auto hidden group-hover/item:block">
                        <div className="flex items-center justify-end gap-2">
                          {id === item.id && (
                            <button onClick={() => handleEditTitle(item.id)}>
                              {showEditInput ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Edit className="h-4 w-4 text-slate-300 hover:text-slate-500" />
                              )}
                            </button>
                          )}
                          {id === item.id && (
                            <button onClick={() => handleEditCate(item.id)}>
                              {showEditCate ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <FolderEdit className="h-4 w-4 text-slate-300 hover:text-slate-500" />
                              )}
                            </button>
                          )}
                          {id !== item.id && (
                            <button onClick={() => handleDeleteItem(item.id)}>
                              <Trash2 className="h-4 w-4 text-slate-300" />
                            </button>
                          )}
                        </div>
                      </div>

                      {sharesCache.length > 0 &&
                        sharesCache.find((i) => i.localId === item.id) && (
                          <Link href={`/publish/${item.id}`} target="_blank">
                            <ExternalLink className="h-4 w-4 text-blue-500" />
                          </Link>
                        )}
                    </div>
                  ))}
              </motion.div>
            ))}

          {/* {openHistory &&
            contentsCache
              .sort((a, b) => b.updated_at - a.updated_at)
              .map((item) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="group/item my-2 mb-2 flex items-center justify-between gap-2 transition-all"
                >
                  {showEditInput && id === item.id ? (
                    <input
                      type="text"
                      className="rounded border px-2 py-1 text-xs text-slate-500"
                      defaultValue={item.title}
                      onChange={(e) => handleChangeTitle(e.target.value)}
                      onKeyDown={(e) => handleKeydown(e.key)}
                    />
                  ) : (
                    <p
                      className={
                        "flex cursor-pointer items-center justify-start gap-2 truncate font-mono text-xs hover:opacity-80 " +
                        `${id === item.id ? "text-blue-500" : "text-gray-500"}`
                      }
                      onClick={() => router.push(`/post/${item.id}`)}
                    >
                      {item.title.length > 0 ? item.title : "Untitled"}
                    </p>
                  )}

                  <div className="ml-auto hidden group-hover/item:block">
                    <div className="flex items-center justify-end gap-2">
                      {id === item.id && (
                        <button onClick={() => handleEditTitle(item.id)}>
                          {showEditInput ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Edit className="h-4 w-4 text-slate-300" />
                          )}
                        </button>
                      )}
                      <button onClick={() => handleDeleteItem(item.id)}>
                        <Trash2 className="h-4 w-4 text-slate-300" />
                      </button>
                    </div>
                  </div>

                  {sharesCache.length > 0 &&
                    sharesCache.find((i) => i.localId === item.id) && (
                      <Link href={`/publish/${item.id}`} target="_blank">
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                      </Link>
                    )}
                </motion.div>
              ))} */}

          {sharesCache.length > 0 && (
            <>
              <div
                className="mt-3 flex cursor-pointer items-center justify-between border-t border-slate-200/70 pt-3"
                onClick={() => {
                  setOpenShares(!openShares);
                }}
              >
                <p className="font-mono text-sm font-semibold text-slate-400">
                  Published({shares.data.length})
                </p>
                <button className="rounded bg-slate-100 hover:bg-slate-200">
                  {openShares ? (
                    <Minus className="h-5 w-5 cursor-pointer p-1 text-slate-500" />
                  ) : (
                    <Plus className="h-5 w-5 cursor-pointer p-1 text-slate-500" />
                  )}
                </button>
              </div>

              {openShares &&
                sharesCache.map((item) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    className="group/item mt-2 flex items-center justify-between"
                  >
                    <button
                      onClick={() =>
                        handleClickPublishNote(item.id, item.localId)
                      }
                      className={
                        `${
                          item.localId === id
                            ? "text-blue-500"
                            : "text-gray-500"
                        }` + " truncate font-mono text-xs hover:opacity-80"
                      }
                    >
                      {JSON.parse(item.data || "{}").title || "Untitled"}
                    </button>

                    <button
                      className="ml-auto hidden group-hover/item:block"
                      onClick={() => handleDeletePublicItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-slate-300" />
                    </button>

                    {contentsCache.findIndex((i) => i.id === item.localId) ===
                      -1 && (
                      <Tooltip
                        content={
                          <div className="w-64 px-3 py-2 text-sm text-slate-400">
                            <h1 className="mb-2 font-semibold text-slate-500">
                              Cross device sync note
                            </h1>
                            <p>
                              Sync your notes from other devices to the current
                              device (history list).
                            </p>
                          </div>
                        }
                        fullWidth={false}
                      >
                        <button
                          className="ml-2"
                          onClick={() =>
                            handleSyncPublisToLocal(item.localId, item.data)
                          }
                        >
                          <DownloadCloud className="h-4 w-4 text-slate-400" />
                        </button>
                      </Tooltip>
                    )}
                  </motion.div>
                ))}
            </>
          )}

          {roomsCache.length > 0 && (
            <>
              <div
                className="mt-3 flex cursor-pointer items-center justify-between border-t border-slate-200/70 pt-3"
                onClick={() => {
                  setOpenRooms(!openRooms);
                }}
              >
                <p className="font-mono text-sm font-semibold text-slate-400">
                  Collaborations({rooms.data.length})
                </p>
                <button className="rounded bg-slate-100 hover:bg-slate-200">
                  {openRooms ? (
                    <Minus className="h-5 w-5 cursor-pointer p-1 text-slate-500" />
                  ) : (
                    <Plus className="h-5 w-5 cursor-pointer p-1 text-slate-500" />
                  )}
                </button>
              </div>

              {openRooms &&
                roomsCache.map((item) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    key={item.id}
                    className="group/item mt-2 flex items-center justify-between"
                  >
                    <button
                      onClick={() =>
                        router.push(`/post/${item.localId}?work=${item.roomId}`)
                      }
                      className={
                        `${
                          item.localId === id
                            ? "text-blue-500"
                            : "text-gray-500"
                        }` + " truncate font-mono text-xs hover:opacity-80"
                      }
                    >
                      {item.title}
                    </button>

                    <button
                      className="ml-auto hidden group-hover/item:block"
                      onClick={() => handleQuitSpace(item.id, item.roomId)}
                    >
                      <Trash2 className="h-4 w-4 text-slate-300" />
                    </button>
                  </motion.div>
                ))}
            </>
          )}
        </div>

        <div className="border-b border-slate-200/70" />

        <Suspense>
          {session ? (
            <div className="-mb-2 text-center">
              <UserDropdown
                session={session}
                setShowEditModal={setShowEditModal}
              />
            </div>
          ) : (
            <button
              className="mx-3 mt-3 rounded-md border border-slate-800 bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-100 transition-all hover:bg-slate-600"
              onClick={() => setShowSignInModal(true)}
            >
              Sign in for more
            </button>
          )}
        </Suspense>

        <div className="-mb-1 flex items-center justify-center text-sm">
          <Link className="hover:text-slate-300" href="/">
            Home
          </Link>
          <span className="mx-2">‣</span>
          <Link
            className="hover:text-slate-300"
            href="/document"
            target="_blank"
          >
            Document
          </Link>
          <span className="mx-2">‣</span>
          <Link className="hover:text-slate-300" href="/pricing">
            Pricing
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
