import { Editor } from "@tiptap/react";
import { useContext, useEffect, useRef, useState } from "react";
import { NovelContext } from "../provider";
import { useCompletion } from "ai/react";
import { PauseCircle, Send, XIcon } from "lucide-react";
import "./chat.css";
import Magic1 from "@/ui/icons/magic-1";
import { motion } from "framer-motion";

export function ChatBot({ editor }: { editor: Editor | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { completionApi, plan } = useContext(NovelContext);

  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  const { complete, completion, setCompletion, isLoading, stop } =
    useCompletion({
      id: "ai-bot",
      api: `${completionApi}/bot`,
      body: { plan },
    });

  const handleChat = () => {
    if (isLoading) {
      stop();
      return;
    }
    if (editor) {
      const prompt = editor.getText();
      complete(prompt);
    }
  };

  const toggleOpen = () => {
    editor?.chain().blur();
    setIsOpen(!isOpen);
  };

  return (
    <div className="novel-fixed z-[1009] novel-bottom-3 novel-right-3 novel-animate-in novel-fade-in novel-slide-in-from-bottom-1">
      <motion.div
        className="novel-rounded-full"
        initial={{ borderRadius: "50%", x: 0 }}
        animate={{ borderRadius: isOpen ? "0%" : "50%", x: isOpen ? 0 : 35 }}
        transition={{ duration: 0.2 }}>
        {isOpen ? (
          <div className="novel-flex novel-p-2 novel-rounded-lg novel-bg-white novel-shadow-lg novel-items-center novel-justify-center">
            <button className="mr-2" onClick={toggleOpen}>
              <Magic1 className="novel-h-5 novel-w-5 translate-y-1 novel-text-purple-400" />
            </button>
            <textarea
              ref={inputRef}
              maxLength={300}
              rows={1}
              className="novel-flex-grow novel-border novel-border-gray-200 novel-shadow-inner novel-rounded-lg novel-px-4 novel-py-1 focus:novel-outline-none"
              placeholder="Chat with note"
            />

            <button
              onClick={handleChat}
              className="novel-px-2 novel-py-2 novel-bg-slate-100 novel-text-white novel-rounded-lg hover:novel-bg-slate-300">
              {!isLoading ? (
                <Send className="novel-h-5 novel-w-5 novel-text-stone-600" />
              ) : (
                <PauseCircle className="novel-h-5 novel-w-5 novel-text-stone-600" />
              )}
            </button>
          </div>
        ) : (
          <button
            className="novel-p-3 novel-bg-white novel-shadow-lg novel-rounded-full"
            onClick={toggleOpen}>
            <Magic1 className="novel-h-5 novel-w-5 translate-y-1 novel-text-purple-400" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
