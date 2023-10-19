import LoadingCircle from "@/ui/icons/loading-circle";
import LoadingDots from "@/ui/icons/loading-dots";
import Magic from "@/ui/icons/magic";
import { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import { useCompletion } from "ai/react";
import { PauseCircle } from "lucide-react";
import AIGeneratingLoading from "./ai-loading";

type Props = {
  editor: Editor;
};

const AIBubbleMenu: React.FC<Props> = ({ editor }: Props) => {
  const { completion, isLoading, stop } = useCompletion({
    id: "novel-edit",
    api: "/api/generate",
  });

  return completion.length > 0 ? (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        placement: "bottom",
        popperOptions: {
          strategy: "fixed",
        },
      }}
      className="novel-mt-4 novel-w-full novel-overflow-hidden novel-rounded novel-border novel-border-stone-200 novel-bg-white novel-shadow-xl novel-animate-in novel-fade-in novel-slide-in-from-bottom-1">
      <div className="novel-p-4">{completion.length > 0 && completion}</div>
      {/* <div className="novel-flex novel-w-full novel-items-center novel-bg-stone-100 novel-p-2">
        <div className="novel-flex novel-items-center novel-space-x-1 novel-text-stone-500">
          <Magic className="novel-h-5 novel-w-5" />
          <p className="novel-text-sm novel-font-medium">AI is writing...</p>
          <LoadingDots color="#78716C" />
        </div>
      </div> */}
    </BubbleMenu>
  ) : null;
};

export default AIBubbleMenu;
