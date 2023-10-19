import LoadingDots from "@/ui/icons/loading-dots";
import Magic from "@/ui/icons/magic";
import { Editor } from "@tiptap/core";
import { useCompletion } from "ai/react";
import { X, Clipboard } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import va from "@vercel/analytics";

type Props = {
  editor: Editor;
};

const AIBubbleMenu: React.FC<Props> = ({ editor }: Props) => {
  const [isShow, setIsShow] = useState(false);

  const { completion, isLoading, stop } = useCompletion({
    id: "novel-edit",
    api: "/api/generate",
    onError: (err) => {
      toast.error(err.message);
      if (err.message === "You have reached your request limit for the day.") {
        va.track("Rate Limit Reached");
      }
    },
  });

  useEffect(() => {
    if (completion.length > 0) {
      setIsShow(true);
    }
  }, [completion]);

  const handleCopy = () => {
    navigator.clipboard.writeText(completion);
  };

  return isShow || isLoading ? (
    <div className="novel-fixed z-[1000] novel-bottom-3 novel-right-3 novel-p-3 novel-overflow-hidden novel-rounded novel-border novel-border-stone-200 novel-bg-white novel-shadow-xl novel-animate-in novel-fade-in novel-slide-in-from-bottom-1">
      <div className="novel-w-64 novel-max-h-48 novel-overflow-y-auto">
        <div className=" novel-flex novel-gap-2 novel-items-center novel-text-slate-500">
          <Magic className="novel-h-5 novel-animate-pulse novel-w-5 novel-text-purple-500" />
          {isLoading && (
            <div className="novel-mr-auto novel-flex novel-items-center">
              <LoadingDots color="#9e9e9e" />
            </div>
          )}

          <div className="novel-flex novel-items-center novel-ml-auto gap-2">
            <button>
              <Clipboard
                onClick={handleCopy}
                className="novel-w-4 novel-h-4 novel-cursor-pointer hover:novel-text-slate-300 "
              />
            </button>

            <X
              onClick={() => setIsShow(false)}
              className="novel-w-4 novel-h-4 novel-cursor-pointer hover:novel-text-slate-300 "
            />
          </div>
        </div>
        {completion.length > 0 && (
          <div className="novel-text-sm mt-2">{completion}</div>
        )}
      </div>
    </div>
  ) : null;
};

export default AIBubbleMenu;
