import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { HocuspocusProvider } from "@hocuspocus/provider";
// import { WebrtcProvider } from "y-webrtc";
// import * as Y from "yjs";

// export function useCollaborationExt(
//   active: boolean,
//   id: string,
//   maxConns: number = 10
// ) {
//   const collaborateRef = useRef<Extension<CollaborationOptions, any>>();
//   const providerRef = useRef<WebrtcProvider>();

//   useEffect(() => {
//     if (!active) return;

//     const name = `inke-${id}`;
//     const ydoc = new Y.Doc();
//     const provider = new WebrtcProvider(name, ydoc, {
//       maxConns: 20 + Math.floor(Math.random() * 15),
//     });

//     collaborateRef.current = Collaboration.configure({ document: ydoc });
//     providerRef.current = provider;
//   }, []);

//   return { collaborate: collaborateRef.current, provider: providerRef.current };
// }

import { useMemo } from "react";

export function useCollaborationExt(
  active: boolean,
  id: string,
  userName: string
): any {
  const collaborationData = useMemo(() => {
    if (!active) return {};

    const name = `inke-${id}`;
    const provider = new HocuspocusProvider({
      url: "ws://127.0.0.1:1234",
      name,
    });

    return {
      collaborates: [
        Collaboration.configure({ document: provider.document }),
        CollaborationCursor.configure({
          provider: provider,
          user: {
            name: userName,
            color: generateRandomColorCode(),
          },
        }),
      ],
      provider: provider.document,
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
