import LoadingCircle from "@/ui/icons/loading-circle";
import LoadingDots from "@/ui/icons/loading-dots";
import Magic from "@/ui/icons/magic";
import { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import { useCompletion } from "ai/react";
import { Clapperboard, PauseCircle, Trash2 } from "lucide-react";
import AIGeneratingLoading from "./ai-loading";
import { useEffect, useState } from "react";

type Props = {
  editor: Editor;
};

const AIBubbleMenu: React.FC<Props> = ({ editor }: Props) => {
  const [currentCompletion, setCompletion] = useState("");
  const [isShow, setIsShow] = useState(false);

  const { completion, isLoading, stop } = useCompletion({
    id: "novel-edit",
    api: "/api/generate",
  });

  useEffect(() => {
    if (completion.length > 0) {
      setIsShow(true);
      setCompletion(completion);
    }
  }, [completion]);

  const handleCopy = () => {
    // setCompletion("");
  };

  return isShow || isLoading ? (
    <div className="novel-fixed novel-max-w-64 novel-bottom-3 novel-right-3 novel-p-3 novel-overflow-hidden novel-rounded novel-border novel-border-stone-200 novel-bg-white novel-shadow-xl novel-animate-in novel-fade-in novel-slide-in-from-bottom-1">
      {isLoading ? (
        <div className="novel-flex gap-2 novel-items-center ">
          <Magic className="novel-h-5 novel-mr-auto novel-w-5 novel-text-purple-500" />
          <span className="novel-text-slate-500">loading...</span>
        </div>
      ) : (
        <>
          <div className=" novel-flex novel-gap-2 novel-items-center novel-text-slate-500">
            <Magic className="novel-h-5 novel-mr-auto novel-w-5 novel-text-purple-500" />

            <Clapperboard
              onClick={handleCopy}
              className="novel-w-4 novel-h-4 novel-cursor-pointer hover:novel-text-slate-300 "
            />
            <Trash2
              onClick={() => {
                setIsShow(false);
                setCompletion("");
              }}
              className="novel-w-4 novel-h-4 novel-cursor-pointer hover:novel-text-slate-300 "
            />
          </div>
          <div className="novel-text-sm">{currentCompletion}</div>
        </>
      )}
    </div>
  ) : null;
};

export default AIBubbleMenu;
