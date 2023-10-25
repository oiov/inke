import { Editor } from "@tiptap/react";
import { useContext, useState } from "react";
import { NovelContext } from "../provider";
import { useCompletion } from "ai/react";
import { Magic } from "@/ui/icons";
import { PauseCircle } from "lucide-react";
import "./chat.css";

export function ChatBot({ editor }: { editor: Editor | null }) {
  const [active, setActive] = useState(false);

  const { completionApi, plan } = useContext(NovelContext);

  const { complete, completion, setCompletion, isLoading, stop } =
    useCompletion({
      id: "ai-bot",
      api: `${completionApi}/bot`,
      body: { plan },
    });

  const handleOpenChat = () => {
    if (editor) {
      const prompt = editor.getText();
      complete(prompt);
    }
  };

  return (
    <div className="novel-fixed z-[1000] novel-bottom-3 novel-right-3 novel-p-3 novel-overflow-hidden novel-rounded novel-border novel-border-stone-200 novel-bg-white novel-shadow-xl novel-animate-in novel-fade-in novel-slide-in-from-bottom-1">
      <button onClick={() => setActive(false)}>Close</button>
      <div className="chat-input">
        <input
          type="text"
          name="text"
          className={`${active ? "active" : ""}` + " input"}
          placeholder="Chat with note"
        />
        <button className="icon" onClick={() => setActive(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="h-5 w-5 translate-y-1 text-purple-400">
            <path
              d="M9.2467 3C9.65074 6.17905 12.5275 9.00324 15.6934 9.5C12.5275 9.99676 9.65074 12.8209 9.24669 16C8.84265 12.8209 6.16589 9.99676 3 9.5C6.16589 9.00324 8.84265 6.19877 9.2467 3.01971M17.3 20L17.2329 19.5924C17.0448 18.4504 16.1496 17.5552 15.0076 17.3671L14.6 17.3L15.0076 17.2329C16.1496 17.0448 17.0448 16.1496 17.2329 15.0076L17.3 14.6L17.3671 15.0076C17.5552 16.1496 18.4504 17.0448 19.5924 17.2329L20 17.3L19.5924 17.3671C18.4504 17.5552 17.5552 18.4504 17.3671 19.5924L17.3 20Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"></path>
          </svg>
        </button>
      </div>
      <button onClick={handleOpenChat}>聊</button>
      {isLoading && (
        <button className="p-2">
          <PauseCircle
            onClick={stop}
            className="novel-h-5 hover:novel-text-stone-500 cursor-pointer novel-w-4 novel-text-stone-300"
          />
        </button>
      )}
    </div>
  );
}
