"use client";

import Editor from "@/app/post/[id]/editor";
import Sidebar from "@/app/post/[id]/sider";
import { Note_Storage_Key } from "@/lib/consts";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { ContentItem } from "@/lib/types/note";
import { useCreatRoomModal } from "@/ui/layout/create-room-modal";
import { useEditNicknameModal } from "@/ui/layout/edit-nickname-modal";
import { useSignInModal } from "@/ui/layout/sign-in-modal";
import { Session } from "next-auth";

export default function Wrapper({
  id,
  session,
}: {
  id: string;
  session: Session | null;
}) {
  const { EditModal, setShowEditModal } = useEditNicknameModal(session);
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { RoomModal, setShowRoomModal } = useCreatRoomModal(session, "", id);
  const [contents, setContents] = useLocalStorage<ContentItem[]>(
    Note_Storage_Key,
    [],
  );

  return (
    <>
      <SignInModal />
      <EditModal />
      <RoomModal />

      <div className="flex">
        <Sidebar
          id={id}
          session={session}
          contents={contents}
          setContents={setContents}
          setShowEditModal={setShowEditModal}
          setShowSignInModal={setShowSignInModal}
          setShowRoomModal={setShowRoomModal}
        />
        <Editor
          id={id}
          session={session}
          contents={contents}
          setContents={setContents}
          setShowRoomModal={setShowRoomModal}
        />
      </div>
    </>
  );
}
