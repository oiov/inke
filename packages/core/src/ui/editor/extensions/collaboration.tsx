import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { HocuspocusProvider } from "@hocuspocus/provider";
// import * as Y from "yjs";
// import { TiptapCollabProvider } from "@hocuspocus/provider";
import { useMemo } from "react";
import { Users } from "lucide-react";
import { Editor } from "@tiptap/core";

export interface User {
  clientId?: string;
  name: string;
  color: string;
}

export function useCollaborationExt(
  active: boolean,
  id: string,
  user: User
): any {
  const collaborationData = useMemo(() => {
    if (!active) return {};

    const name = `inke-${id}`;
    const provider = new HocuspocusProvider({
      // ws://107.172.87.158:1234 wss://ws.taoist.fun ws://127.0.0.1:1234
      url: "wss://ws.taoist.fun",
      name,
    });

    // const ydoc = new Y.Doc();
    // const wsprovider = new TiptapCollabProvider({
    //   appId: "7j9y6m10", // 89jn14k7
    //   name,
    //   document: ydoc,
    // });

    return {
      collaborates: [
        Collaboration.configure({ document: provider.document }),
        CollaborationCursor.configure({
          provider: provider,
          user,
        }),
      ],
      provider: provider, // provider.document / wsprovider
    };
  }, [active, id]);

  return collaborationData;
}

export function CollaborationInfo({
  status,
  editor,
}: {
  status: string;
  editor: Editor;
}) {
  return (
    <div className="novel-fixed novel-z-[9999] novel-bottom-3 novel-right-3">
      {status === "connected" ? (
        <div className="novel-flex novel-group novel-font-semibold novel-gap-1 novel-items-center novel-justify-center">
          <Users className="novel-h-4 novel-text-cyan-500 novel-w-4" />
          <span className="novel-text-xs novel-text-slate-500">
            {editor.storage?.collaborationCursor?.users?.length}
          </span>
          <div className="novel-hidden novel-z-[10000] novel-bg-slate-50/90 novel-max-h-64 novel-overflow-y-auto novel-p-2 novel-w-44 novel-border-slate-100 novel-rounded-md novel-shadow-md novel-absolute novel-bottom-0 novel-right-0 group-hover:novel-block">
            <p className="novel-gap-2 novel-mb-1 novel-items-center novel-flex novel-text-xs novel-text-slate-600 novel-pb-1 novel-border-b novel-border-slate-100">
              <Users className="novel-h-4 novel-text-cyan-500 novel-w-4" />
              {editor.storage.collaborationCursor.users.length} user
              {editor.storage.collaborationCursor.users.length === 1
                ? ""
                : "s"}{" "}
              online in space
            </p>

            {editor.storage?.collaborationCursor?.users?.map((i: User) => (
              <div
                key={i.clientId}
                className="novel-truncate novel-flex novel-items-center novel-gap-2 novel-cursor-pointer hover:novel-opacity-80 novel-font-mono novel-pt-1 novel-text-xs novel-text-slate-500">
                <i
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: i.color,
                    display: "block",
                    transition: "all 0.5s",
                  }}
                />
                <span>{i.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <span className="novel-text-sm novel-animate-pulse novel-text-slate-500">
          connecting...
        </span>
      )}
    </div>
  );
}

export function generateRandomColorCode(): string {
  const letters = "0123456789ABCDEF";
  let colorCode = "#";
  for (let i = 0; i < 6; i++) {
    colorCode += letters[Math.floor(Math.random() * 16)];
  }
  return colorCode;
}
