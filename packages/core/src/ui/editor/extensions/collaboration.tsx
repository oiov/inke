import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as Y from "yjs";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import { useMemo } from "react";

export function useCollaborationExt(
  active: boolean,
  id: string,
  userName: string
): any {
  const collaborationData = useMemo(() => {
    if (!active) return {};
    console.log("激活", id, userName);

    const name = `inke-${id}`;
    // const provider = new HocuspocusProvider({
    //   url: "ws://127.0.0.1:1234",
    //   name,
    // });

    const ydoc = new Y.Doc();
    const wsprovider = new TiptapCollabProvider({
      appId: "7j9y6m10", // 89jn14k7
      name,
      document: ydoc,
    });

    return {
      collaborates: [
        Collaboration.configure({ document: wsprovider.document }),
        CollaborationCursor.configure({
          provider: wsprovider,
          user: {
            name: userName,
            color: generateRandomColorCode(),
          },
        }),
      ],
      provider: wsprovider, // provider.document
    };
  }, [active, id]);

  return collaborationData;
}

function generateRandomColorCode(): string {
  const letters = "0123456789ABCDEF";
  let colorCode = "#";
  for (let i = 0; i < 6; i++) {
    colorCode += letters[Math.floor(Math.random() * 16)];
  }
  return colorCode;
}
