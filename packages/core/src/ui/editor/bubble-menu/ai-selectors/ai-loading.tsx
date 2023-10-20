import { Magic } from "@/ui/icons";
import { PauseCircle } from "lucide-react";

export default function AIGeneratingLoading({ stop }: { stop: () => void }) {
  return (
    <div className="flex items-center justify-start novel-bg-white shadow-lg rounded-full px-3 py-2 w-16 h-10">
      <Magic className="novel-w-7 novel-animate-pulse novel-text-purple-500" />
      <span className="text-sm novel-animate-pulse novel-ml-1 novel-text-slate-500">
        generating...
      </span>
      <PauseCircle
        onClick={stop}
        className="novel-h-5 hover:novel-text-stone-500 cursor-pointer novel-ml-6 novel-w-5 novel-text-stone-300"
      />
    </div>
  );
}
