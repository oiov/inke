import { Editor } from "@tiptap/core";
import { Check, ChevronDown } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import * as Popover from "@radix-ui/react-popover";

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

export interface BubbleFontMenuItem {
  name: string;
  font: string;
}

interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "var(--inke-black)",
  },
  {
    name: "Purple",
    color: "#9333EA",
  },
  {
    name: "Red",
    color: "#E00000",
  },
  {
    name: "Yellow",
    color: "#EAB308",
  },
  {
    name: "Blue",
    color: "#2563EB",
  },
  {
    name: "Green",
    color: "#008A00",
  },
  {
    name: "Orange",
    color: "#FFA500",
  },
  {
    name: "Pink",
    color: "#BA4081",
  },
  {
    name: "Gray",
    color: "#A8A29E",
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "var(--inke-highlight-default)",
  },
  {
    name: "Purple",
    color: "var(--inke-highlight-purple)",
  },
  {
    name: "Red",
    color: "var(--inke-highlight-red)",
  },
  {
    name: "Yellow",
    color: "var(--inke-highlight-yellow)",
  },
  {
    name: "Blue",
    color: "var(--inke-highlight-blue)",
  },
  {
    name: "Green",
    color: "var(--inke-highlight-green)",
  },
  {
    name: "Orange",
    color: "var(--inke-highlight-orange)",
  },
  {
    name: "Pink",
    color: "var(--inke-highlight-pink)",
  },
  {
    name: "Gray",
    color: "var(--inke-highlight-gray)",
  },
];

const TEXT_FONT: BubbleFontMenuItem[] = [
  {
    name: "Default",
    font: "",
  },
  {
    name: "Inter",
    font: "Inter",
  },
  {
    name: "Comic Sans",
    font: "Comic Sans MS, Comic Sans",
  },
  {
    name: "monospace",
    font: "monospace",
  },
  {
    name: "serif",
    font: "serif",
  },
  {
    name: "cursive",
    font: "cursive",
  },
];

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );

  const activeFontItem = TEXT_FONT.find(({ font }) =>
    editor.isActive("textStyle", { font })
  );

  return (
    <Popover.Root open={isOpen}>
      <div className="novel-relative novel-h-full">
        <Popover.Trigger
          className="novel-flex novel-h-full novel-items-center novel-gap-1 novel-p-2 novel-text-sm novel-font-medium novel-text-stone-600 hover:novel-bg-stone-100 active:novel-bg-stone-200"
          onClick={() => setIsOpen(!isOpen)}>
          <span
            className="novel-rounded-sm novel-px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
              fontFamily: activeFontItem?.font,
            }}>
            A
          </span>

          <ChevronDown className="novel-h-4 novel-w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="novel-z-[99999] novel-my-1 novel-flex novel-max-h-80 novel-w-48 novel-flex-col novel-overflow-hidden novel-overflow-y-auto novel-rounded novel-border novel-border-stone-200 novel-bg-white novel-p-1 novel-shadow-xl novel-animate-in novel-fade-in novel-slide-in-from-top-1">
          <div className="novel-my-1 novel-px-2 novel-text-sm novel-text-stone-500">
            Color
          </div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetColor();
                name !== "Default" &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || "")
                    .run();
                setIsOpen(false);
              }}
              className="novel-flex novel-items-center novel-justify-between novel-rounded-sm novel-px-2 novel-py-1 novel-text-sm novel-text-stone-600 hover:novel-bg-stone-100"
              type="button">
              <div className="novel-flex novel-items-center novel-space-x-2">
                <div
                  className="novel-rounded-sm novel-border novel-border-stone-200 novel-px-1 novel-py-px novel-font-medium"
                  style={{ color }}>
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("textStyle", { color }) && (
                <Check className="novel-h-4 novel-w-4" />
              )}
            </button>
          ))}

          <div className="novel-mb-1 novel-mt-2 novel-px-2 novel-text-sm novel-text-stone-500">
            Background
          </div>
          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight();
                name !== "Default" && editor.commands.setHighlight({ color });
                setIsOpen(false);
              }}
              className="novel-flex novel-items-center novel-justify-between novel-rounded-sm novel-px-2 novel-py-1 novel-text-sm novel-text-stone-600 hover:novel-bg-stone-100"
              type="button">
              <div className="novel-flex novel-items-center novel-space-x-2">
                <div
                  className="novel-rounded-sm novel-border novel-border-stone-200 novel-px-1 novel-py-px novel-font-medium"
                  style={{ backgroundColor: color }}>
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("highlight", { color }) && (
                <Check className="novel-h-4 novel-w-4" />
              )}
            </button>
          ))}

          <div className="novel-mb-1 novel-mt-2 novel-px-2 novel-text-sm novel-text-stone-500">
            Font
          </div>
          {TEXT_FONT.map(({ name, font }, index) => (
            <button
              key={index}
              onClick={() => {
                if (name !== "Default") {
                  editor.commands.setFontFamily(font);
                } else {
                  editor.commands.unsetFontFamily();
                }
                setIsOpen(false);
              }}
              className="novel-flex novel-items-center novel-justify-between novel-rounded-sm novel-px-2 novel-py-1 novel-text-sm novel-text-stone-600 hover:novel-bg-stone-100"
              type="button">
              <div className="novel-flex novel-items-center novel-space-x-2">
                <div
                  className="novel-rounded-sm novel-border novel-border-stone-200 novel-px-1 novel-py-px novel-font-medium"
                  style={{ fontFamily: font }}>
                  A
                </div>
                <span style={{ fontFamily: font }}>{name}</span>
              </div>
              {editor.isActive("textStyle", { font }) && (
                <Check className="novel-h-4 novel-w-4" />
              )}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
