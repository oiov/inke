import Modal from "@/ui/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots } from "@/ui/shared/icons";
import { fetcher } from "@/lib/utils";
import { Session } from "next-auth";
import { useUserInfoByEmail } from "@/app/post/[id]/request";
import shortid from "shortid";
import { IResponse } from "@/lib/types/response";
import { Collaboration } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreatRoomModal = ({
  initTitle,
  localId,
  session,
  showEditModal,
  setShowEditModal,
}: {
  initTitle: string;
  localId: string;
  session: Session | null;
  showEditModal: boolean;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserInfoByEmail(session?.user?.email || "");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSendSuccess, setIsSendSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!session?.user || !user || !title) return;
    if (title.length < 3 || title.length > 20) return;

    setLoading(true);

    const roomId = shortid.generate().replace("_", "A").replace("-", "a");
    const res = await fetcher<IResponse<Collaboration | null>>(
      "/api/collaboration",
      {
        method: "POST",
        body: JSON.stringify({
          roomId,
          localId,
          title,
        }),
      },
    );
    if (res.code !== 200) {
      toast(res.msg, {
        icon: "😅",
      });
    } else {
      toast.success(res.msg, {
        icon: "🎉",
      });
      router.push(`/post/${localId}?work=${roomId}`);
    }
    if (res) {
      setLoading(false);
      setIsSendSuccess(true);
      setShowEditModal(false);
    }
  };
  const handleKeydown = (key: string) => {
    if (key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Modal showModal={showEditModal} setShowModal={setShowEditModal}>
      <div className="w-full overflow-hidden bg-gray-50 shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h3 className="font-display text-2xl font-bold">
            Create collaboration space
          </h3>
          {/* <p className="text-sm text-gray-500"></p> */}
        </div>

        <div className="px-14 py-10">
          <input
            className="shadow-blue-gray-200 mb-4 w-full rounded-md border border-slate-200 bg-[#f8f8f8a1] px-3 py-3 text-sm placeholder-gray-400 shadow-inner"
            type="text"
            placeholder={"Enter space name"}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => handleKeydown(e.key)}
          />
          <button
            // disabled={loading}
            onClick={handleSubmit}
            className={`
              ${
                loading
                  ? "border-gray-300 bg-gray-200"
                  : `${
                      isSendSuccess
                        ? " border-blue-500 bg-blue-500 hover:text-blue-500"
                        : "border-black bg-black hover:text-black"
                    } hover:bg-gray-100`
              } 
              h-10 w-full rounded-md border px-2 py-1 text-sm text-slate-100 transition-all `}
          >
            {loading ? (
              <LoadingDots color="gray" />
            ) : (
              <div className="flex items-center justify-center">
                {isSendSuccess && !loading ? "Success!" : "Submit"}
              </div>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export function useCreatRoomModal(
  session: Session | null,
  initTitle: string,
  localId: string,
) {
  const [showRoomModal, setShowRoomModal] = useState(false);

  const RoomModalCallback = useCallback(() => {
    return (
      <CreatRoomModal
        initTitle={initTitle}
        localId={localId}
        session={session}
        showEditModal={showRoomModal}
        setShowEditModal={setShowRoomModal}
      />
    );
  }, [showRoomModal, setShowRoomModal]);

  return useMemo(
    () => ({ setShowRoomModal, RoomModal: RoomModalCallback }),
    [setShowRoomModal, RoomModalCallback],
  );
}
