"use client";

import Editor from "@/app/post/[id]/editor";
import Sidebar from "@/app/post/[id]/sider";
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

  return (
    <>
      <SignInModal />
      <EditModal />
      <RoomModal />

      <div className="flex">
        <Sidebar
          id={id}
          session={session}
          setShowEditModal={setShowEditModal}
          setShowSignInModal={setShowSignInModal}
          setShowRoomModal={setShowRoomModal}
        />
        <Editor id={id} session={session} setShowRoomModal={setShowRoomModal} />
      </div>
    </>
  );
}
