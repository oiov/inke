"use client";

import { AppContext } from "@/app/providers";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/ui/primitives/popover";
// import { useContext } from "react";
// import { AppContext } from "../app/providers";
// import { FontDefault, FontSerif, FontMono } from "@/ui/icons";
import {
  Check,
  FileJson,
  FileText,
  Menu as MenuIcon,
  Monitor,
  Moon,
  SunDim,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useContext } from "react";
import { FontDefault, FontMono, FontSerif } from "./shared/icons";
import ImageDown from "./shared/icons/image-down";

const fonts = [
  {
    font: "Default",
    icon: <FontDefault className="h-4 w-4" />,
  },
  {
    font: "Serif",
    icon: <FontSerif className="h-4 w-4" />,
  },
  {
    font: "Mono",
    icon: <FontMono className="h-4 w-4" />,
  },
];
const appearances = [
  {
    theme: "System",
    icon: <Monitor className="h-4 w-4" />,
  },
  {
    theme: "Light",
    icon: <SunDim className="h-4 w-4" />,
  },
  {
    theme: "Dark",
    icon: <Moon className="h-4 w-4" />,
  },
];

export default function Menu({
  onExportImage,
  onExportJson,
  onExportTxT,
}: {
  onExportImage: () => void;
  onExportJson: () => void;
  onExportTxT: () => void;
}) {
  const { font: currentFont, setFont } = useContext(AppContext);
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger className="z-10 flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-stone-100 active:bg-stone-200">
        <MenuIcon className="text-stone-600" width={16} />
      </PopoverTrigger>
      <PopoverContent className="w-52 divide-y divide-stone-200" align="end">
        <div className="p-2">
          <p className="p-2 text-xs font-medium text-stone-500">Exports file</p>

          <button
            className="flex w-full items-center gap-3 rounded px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
            onClick={onExportImage}
          >
            <ImageDown className="h-6 w-6 rounded-sm border border-stone-100 p-1" />
            <span>Export as image</span>
          </button>
          <button
            className="flex w-full items-center gap-3 rounded px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
            onClick={onExportJson}
          >
            <FileJson className="h-6 w-6 rounded-sm border border-stone-100 p-1" />
            <span>Export as json</span>
          </button>
          <button
            className="flex w-full items-center gap-3 rounded px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
            onClick={onExportTxT}
          >
            <FileText className="h-6 w-6 rounded-sm border border-stone-100 p-1" />
            <span>Export as txt</span>
          </button>
        </div>

        <div className="p-2">
          <div className="p-2 text-xs font-medium text-stone-500">Themes</div>
          {appearances.map(({ theme, icon }) => (
            <button
              key={theme}
              className="flex w-full items-center justify-between rounded px-2 py-1.5 text-sm text-stone-600 hover:bg-stone-100"
              onClick={() => {
                setTheme(theme.toLowerCase());
              }}
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border border-stone-100 p-1">
                  {icon}
                </div>
                <span>{theme}</span>
              </div>
              {currentTheme === theme.toLowerCase() && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
