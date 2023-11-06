"use client";

import Editor from "@/app/post/[id]/editor";
import Sidebar from "@/app/post/[id]/sider";
import { ContentItem } from "@/lib/types/note";
import { noteTable } from "@/store/db.model";
import { useCreatRoomModal } from "@/ui/layout/create-room-modal";
import { useEditNicknameModal } from "@/ui/layout/edit-nickname-modal";
import { useSignInModal } from "@/ui/layout/sign-in-modal";
import { useLiveQuery } from "dexie-react-hooks";
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

  const notes = useLiveQuery<ContentItem[]>(() =>
    noteTable.orderBy("updated_at").reverse().toArray(),
  );

  return (
    <>
      <SignInModal />
      <EditModal />
      <RoomModal />

      <div className="flex">
        {notes && (
          <>
            <Sidebar
              id={id}
              session={session}
              contents={notes}
              setShowEditModal={setShowEditModal}
              setShowSignInModal={setShowSignInModal}
              setShowRoomModal={setShowRoomModal}
            />
            <Editor
              id={id}
              session={session}
              contents={notes}
              setShowRoomModal={setShowRoomModal}
            />
          </>
        )}
      </div>
    </>
  );
}
