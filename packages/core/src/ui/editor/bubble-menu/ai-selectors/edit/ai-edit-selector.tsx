import { Editor } from "@tiptap/core";
import {
  Beef,
  Book,
  CheckCheck,
  ChevronDown,
  Heading1,
  LayoutPanelTop,
  ListMinus,
  ListPlus,
  PartyPopper,
  PauseCircle,
  Scissors,
  Wand,
} from "lucide-react";
import { FC, useContext, useEffect } from "react";
import { Command } from "cmdk";
import Magic from "@/ui/icons/magic";
import { useCompletion } from "ai/react";
import { NovelContext } from "../../../provider";

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
    {
      name: "Make shorter",
      detail: "Make shorter",
      icon: ListMinus,
    },
    {
      name: "Make longer",
      detail: "Make longer",
      icon: ListPlus,
    },
    {
      name: "Writing suggestions",
      detail: "Provide suggestions and improvements for the writing",
      icon: Beef,
    },
    {
      name: "Enhance vocabulary",
      detail: "Suggest synonyms and expand vocabulary usage",
      icon: Book,
    },
    {
      name: "Generate titles",
      detail: "Automatically generate compelling titles for the content",
      icon: Heading1,
    },
    {
      name: "Templates & structure",
      detail:
        "Offer templates and structure suggestions to improve the writing organization",
      icon: LayoutPanelTop,
    },
    {
      name: "Fix repetitive",
      detail: "Identify and fix repetitive words or phrases in the content",
      icon: Scissors,
    },
    {
      name: "Adjust writing style",
      detail:
        "Suggest adjustments to writing style and tone based on the target audience",
      icon: PartyPopper,
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
    id: "novel-edit",
    api: `${completionApi}/edit`,
    body: { plan },
  });

  return (
    <div className="novel-relative novel-h-full">
      <div className="novel-flex novel-h-full novel-items-center novel-gap-1 novel-text-sm novel-font-medium novel-text-purple-500 hover:novel-bg-stone-100 active:novel-bg-stone-200">
        <button
          className="novel-p-2 novel-flex novel-h-full novel-items-center novel-gap-1"
          onClick={() => {
            if (isLoading) {
              stop();
            }
            setIsOpen(!isOpen);
          }}>
          <Magic className="novel-h-4 novel-w-4" />
          <span className="novel-whitespace-nowrap">Ask AI</span>
          {!isLoading ? (
            <ChevronDown className="novel-h-4 novel-w-4" />
          ) : (
            <PauseCircle
              onClick={stop}
              className="novel-h-4 hover:novel-text-stone-500 cursor-pointer novel-w-4 novel-text-stone-300"
            />
          )}
        </button>
      </div>

      {isOpen && (
        <Command className="novel-fixed novel-top-full novel-z-[99999] novel-mt-1 novel-w-60 novel-overflow-hidden novel-rounded novel-border novel-border-stone-200 novel-bg-white novel-p-2 novel-shadow-xl novel-animate-in novel-fade-in novel-slide-in-from-top-1">
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
                className="novel-flex group novel-cursor-pointer novel-items-center novel-justify-between novel-rounded-sm novel-px-2 novel-py-1 novel-text-sm novel-text-gray-600 active:novel-bg-stone-200 aria-selected:novel-bg-stone-100">
                <div className="novel-flex novel-items-center novel-space-x-2">
                  <item.icon className="novel-h-4 novel-w-4 novel-text-purple-500" />
                  <span>{item.name}</span>
                </div>
                {/* <CornerDownLeft className="novel-hidden novel-h-4 novel-w-4 group-hover:novel-block" /> */}
              </Command.Item>
            ))}
          </Command.List>
        </Command>
      )}
    </div>
  );
};
