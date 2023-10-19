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

  return completion.length === 0 ? (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        placement: "bottom",
        popperOptions: {
          strategy: "fixed",
        },
      }}
      className="novel-mt-8 novel-p-4 novel-w-full novel-overflow-hidden novel-rounded novel-border novel-border-stone-200 novel-bg-white novel-shadow-xl novel-animate-in novel-fade-in novel-slide-in-from-bottom-1">
      <div className="">{completion.length > 0 && completion}</div>
    </BubbleMenu>
  ) : null;
};

export default AIBubbleMenu;
