import Modal from "@/ui/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google, Github } from "@/ui/shared/icons";
import { fetcher } from "@/lib/utils";
import { Session } from "next-auth";
import { useUserInfoByEmail } from "@/app/post/[id]/request";

const EditNicknameModal = ({
  session,
  showEditModal,
  setShowEditModal,
}: {
  session: Session | null;
  showEditModal: boolean;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserInfoByEmail(session?.user?.email || "");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSendSuccess, setIsSendSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!session?.user || !user || !nickname) return;

    setLoading(true);

    const res = await fetcher("/api/users", {
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
        userName: nickname,
      }),
    });
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
          <h3 className="font-display text-2xl font-bold">Your Name</h3>
          {/* <p className="text-sm text-gray-500"></p> */}
        </div>

        <div className="px-14 py-10">
          <input
            className="shadow-blue-gray-200 mb-4 w-full rounded-md border border-slate-200 bg-[#f8f8f8a1] px-3 py-3 text-sm placeholder-gray-400 shadow-inner"
            type="text"
            // value={user?.name}
            placeholder={user?.name || "Enter your"}
            onChange={(e) => setNickname(e.target.value)}
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
                {isSendSuccess && !loading ? "修改成功" : "提交"}
              </div>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export function useEditNicknameModal(session: Session | null) {
  const [showEditModal, setShowEditModal] = useState(false);

  const EditModalCallback = useCallback(() => {
    return (
      <EditNicknameModal
        session={session}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
      />
    );
  }, [showEditModal, setShowEditModal]);

  return useMemo(
    () => ({ setShowEditModal, EditModal: EditModalCallback }),
    [setShowEditModal, EditModalCallback],
  );
}
