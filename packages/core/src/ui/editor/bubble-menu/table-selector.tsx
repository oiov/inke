import { Editor } from "@tiptap/core";
import {
  ChevronDown,
  LucideIcon,
  Rows,
  PanelTop,
  PanelBottom,
  PanelRight,
  PanelLeft,
  Trash2,
  SplitSquareHorizontal,
  Heading1,
} from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import * as Popover from "@radix-ui/react-popover";

export interface BubbleTableMenuItem {
  name: string;
  icon: LucideIcon;
  action: () => boolean;
}

interface TableSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TABLE_COLUMN_CMDS = (editor: Editor): BubbleTableMenuItem[] => {
  return [
    {
      name: "Add column before",
      icon: PanelLeft,
      action: () => editor.chain().focus().addColumnBefore().run(),
    },
    {
      name: "Add column after",
      icon: PanelRight,
      action: () => editor.chain().focus().addColumnAfter().run(),
    },
    {
      name: "Delete column",
      icon: Trash2,
      action: () => editor.chain().focus().deleteColumn().run(),
    },
  ];
};
const TABLE_ROW_CMDS = (editor: Editor): BubbleTableMenuItem[] => {
  return [
    {
      name: "Add row before",
      icon: PanelTop,
      action: () => editor.chain().focus().addRowBefore().run(),
    },
    {
      name: "Add row after",
      icon: PanelBottom,
      action: () => editor.chain().focus().addRowAfter().run(),
    },
    {
      name: "Delete row",
      icon: Trash2,
      action: () => editor.chain().focus().deleteRow().run(),
    },
  ];
};
const TABLE_CELL_CMDS = (editor: Editor): BubbleTableMenuItem[] => {
  return [
    {
      name: "Merge or split",
      icon: SplitSquareHorizontal,
      action: () => editor.chain().focus().mergeOrSplit().run(),
    },
    {
      name: "Toggle header cell",
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeaderCell().run(),
    },
    {
      name: "Delete table",
      icon: Trash2,
      action: () => editor.chain().focus().deleteTable().run(),
    },
  ];
};

export const TableSelector: FC<TableSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Popover.Root open={isOpen}>
      <div className="novel-relative novel-h-full">
        <Popover.Trigger
          className="novel-flex novel-h-full novel-items-center novel-gap-1 novel-p-2 novel-text-sm novel-font-medium novel-text-stone-600 hover:novel-bg-stone-100 active:novel-bg-stone-200"
          onClick={() => setIsOpen(!isOpen)}>
          <span className="novel-rounded-sm novel-px-1">Table</span>

          <ChevronDown className="novel-h-4 novel-w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="novel-z-[99999] novel-my-1 novel-flex novel-max-h-80 novel-w-48 novel-flex-col novel-overflow-hidden novel-overflow-y-auto novel-rounded novel-border novel-border-stone-200 novel-bg-white novel-p-1 novel-shadow-xl novel-animate-in novel-fade-in novel-slide-in-from-top-1">
          <div className="novel-my-1 novel-px-2 novel-text-sm novel-text-stone-500">
            Column
          </div>
          {TABLE_COLUMN_CMDS(editor).map((item, index) => (
            <button
              key={index}
              onClick={() => item.action()}
              className="novel-flex novel-items-center novel-justify-between novel-rounded-sm novel-px-2 novel-py-1 novel-text-sm novel-text-stone-600 hover:novel-bg-stone-100"
              type="button">
              <div className="novel-flex novel-items-center novel-space-x-2">
                <div className="novel-rounded-sm novel-px-1 novel-py-px novel-font-medium">
                  <item.icon className="w-4 h-4 novel-text-slate-400" />
                </div>
                <span>{item.name}</span>
              </div>
            </button>
          ))}

          <div className="novel-my-1 novel-px-2 novel-text-sm novel-text-stone-500">
            Row
          </div>
          {TABLE_ROW_CMDS(editor).map((item, index) => (
            <button
              key={index}
              onClick={() => item.action()}
              className="novel-flex novel-items-center novel-justify-between novel-rounded-sm novel-px-2 novel-py-1 novel-text-sm novel-text-stone-600 hover:novel-bg-stone-100"
              type="button">
              <div className="novel-flex novel-items-center novel-space-x-2">
                <div className="novel-rounded-sm novel-px-1 novel-py-px novel-font-medium">
                  <item.icon className="w-4 h-4 novel-text-slate-400" />
                </div>
                <span>{item.name}</span>
              </div>
            </button>
          ))}

          <div className="novel-my-1 novel-px-2 novel-text-sm novel-text-stone-500">
            Cell
          </div>
          {TABLE_CELL_CMDS(editor).map((item, index) => (
            <button
              key={index}
              onClick={() => item.action()}
              className="novel-flex novel-items-center novel-justify-between novel-rounded-sm novel-px-2 novel-py-1 novel-text-sm novel-text-stone-600 hover:novel-bg-stone-100"
              type="button">
              <div className="novel-flex novel-items-center novel-space-x-2">
                <div className="novel-rounded-sm novel-px-1 novel-py-px novel-font-medium">
                  <item.icon className="w-4 h-4 novel-text-slate-400" />
                </div>
                <span>{item.name}</span>
              </div>
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
