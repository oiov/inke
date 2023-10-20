import { Editor } from "@tiptap/core";
import { Globe2, Languages, PauseCircle } from "lucide-react";
import { FC, useContext, useEffect } from "react";
import { Command } from "cmdk";
import { useCompletion } from "ai/react";
import { NovelContext } from "../../../provider";

interface TranslateSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const TranslateSelector: FC<TranslateSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const items = [
    {
      name: "English",
      detail: "Translate into English",
    },
    {
      name: "Chinese",
      detail: "Translate into Chinese",
    },
    {
      name: "Spanish",
      detail: "Translate into Spanish",
    },
    {
      name: "French",
      detail: "Translate into French",
    },
    {
      name: "German",
      detail: "Translate into German",
    },
    {
      name: "Japanese",
      detail: "Translate into Japanese",
    },
    {
      name: "Russian",
      detail: "Translate into Russian",
    },
    {
      name: "Korean",
      detail: "Translate into Korean",
    },
    {
      name: "Arabic",
      detail: "Translate into Arabic",
    },
    {
      name: "Portuguese",
      detail: "Translate into Portuguese",
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

  const { completionApi, plan } = useContext(NovelContext);

  const { complete, isLoading, stop } = useCompletion({
    id: "novel-translate",
    api: `${completionApi}/translate`,
    body: { plan },
  });

  return (
    <div className="novel-relative novel-h-full">
      <div className="novel-flex novel-h-full novel-items-center novel-text-sm novel-font-medium hover:novel-bg-stone-100 active:novel-bg-stone-200">
        {isLoading ? (
          <button className="p-2">
            <PauseCircle
              onClick={stop}
              className="novel-h-5 hover:novel-text-stone-500 cursor-pointer novel-w-4 novel-text-stone-300"
            />
          </button>
        ) : (
          <button className="p-2">
            <Languages
              onClick={() => setIsOpen(!isOpen)}
              className="novel-h-5 novel-text-stone-600 novel-w-4"
            />
          </button>
        )}
      </div>

      {isOpen && (
        <Command className="novel-fixed novel-top-full novel-z-[99999] novel-mt-1 novel-w-28 novel-overflow-hidden novel-rounded novel-border novel-border-stone-200 novel-bg-white novel-p-2 novel-shadow-xl novel-animate-in novel-fade-in novel-slide-in-from-top-1">
          <Command.List>
            {items.map((item, index) => (
              <Command.Item
                key={index}
                onSelect={() => {
                  if (!isLoading) {
                    const { from, to } = editor.state.selection;
                    const text = editor.state.doc.textBetween(from, to, " ");
                    complete(`${item.detail}:\n ${text}`);
                    setIsOpen(false);
                  }
                }}
                className="novel-flex novel-cursor-pointer novel-items-center novel-justify-between novel-rounded-sm novel-px-2 novel-py-1 novel-text-sm novel-text-gray-600 active:novel-bg-stone-200 aria-selected:novel-bg-stone-100">
                <span>{item.name}</span>
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      )}
    </div>
  );
};
