import { Editor } from "@tiptap/core";
import {
  CheckCheck,
  ChevronDown,
  CornerDownLeft,
  PauseCircle,
  Wand,
} from "lucide-react";
import { FC, useEffect } from "react";
import { Command } from "cmdk";
import Magic from "@/ui/icons/magic";
import { useCompletion } from "ai/react";
import AIGeneratingLoading from "./ai-loading";

interface AISelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AISelector: FC<AISelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items = [
    {
      name: "Improve writing",
      detail: "Improve writing",
      icon: Wand,
    },
    {
      name: "Fix spelling & grammar",
      detail:
        "Please correct spelling and grammar errors in the following text",
      icon: CheckCheck,
    },
  ];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "Enter"].includes(e.key)) {
        e.preventDefault();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const { complete, isLoading, stop } = useCompletion({
    id: "novel-edit",
    api: "/api/generate",
  });

  return (
    <div className="novel-relative novel-h-full">
      <div className="novel-flex novel-h-full novel-items-center novel-gap-1 novel-border-r novel-border-stone-200 p-2 novel-text-sm novel-font-medium novel-text-purple-500 hover:novel-bg-stone-100 active:novel-bg-stone-200">
        <button
          className="novel-flex novel-h-full novel-items-center novel-gap-1"
          onClick={() => setIsOpen(!isOpen)}>
          <Magic className="novel-h-4 novel-w-4" />
          <span className="novel-whitespace-nowrap">Ask AI</span>
          <ChevronDown className="novel-h-4 novel-w-4" />
        </button>
        {isLoading && (
          <PauseCircle
            onClick={stop}
            className="novel-h-5 hover:novel-text-stone-500 cursor-pointer novel-ml-2 novel-w-5 novel-text-stone-300"
          />
        )}
      </div>

      {isOpen && (
        <Command className="novel-fixed novel-top-full novel-z-[99999] novel-mt-1 novel-w-60 novel-overflow-hidden novel-rounded novel-border novel-border-stone-200 novel-bg-white novel-p-2 novel-shadow-xl novel-animate-in novel-fade-in novel-slide-in-from-top-1">
          <Command.List>
            {items.map((item, index) => (
              <Command.Item
                key={index}
                onSelect={() => {
                  const { from, to } = editor.state.selection;
                  const text = editor.state.doc.textBetween(from, to, " ");
                  complete(`${item.detail}:\n ${text}`);
                  setIsOpen(false);
                }}
                className="novel-flex novel-cursor-pointer novel-items-center novel-justify-between novel-rounded-sm novel-px-2 novel-py-1 novel-text-sm novel-text-gray-600 active:novel-bg-stone-200 aria-selected:novel-bg-stone-100">
                <div className="novel-flex novel-items-center novel-space-x-2">
                  <item.icon className="novel-h-4 novel-w-4 novel-text-purple-500" />
                  <span>{item.name}</span>
                </div>
                <CornerDownLeft className="invisible novel-h-4 novel-w-4 aria-selected:visible" />
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      )}
      {/* {isLoading && <AIGeneratingLoading stop={stop} />} */}
    </div>
  );
};
