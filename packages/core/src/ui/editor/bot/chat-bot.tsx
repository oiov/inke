import { Editor } from "@tiptap/react";
import { useContext, useEffect, useRef, useState } from "react";
import { NovelContext } from "../provider";
import { useChat, useCompletion } from "ai/react";
import { Baby, Bot, PauseCircle, Send, Trash, XIcon } from "lucide-react";
import Magic1 from "@/ui/icons/magic-1";
import { motion } from "framer-motion";

interface MessageItem {
  role: string;
  content: string;
}

export function ChatBot({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { completionApi, plan } = useContext(NovelContext);

  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  const {
    messages,
    setMessages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useChat({
    id: "ai-bot",
    api: `${completionApi}/bot`,
    initialInput: editor.getText(),
    body: { plan, system: editor.getText() },
  });

  const handleChat = () => {
    if (isLoading) {
      stop();
      return;
    }
    if (!inputRef.current?.value) return;
  };

  const toggleOpen = () => {
    editor.chain().blur();
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
          <div className="chat novel-border novel-max-w-[300px] novel-border-slate-100  novel-bg-white novel-shadow-lg novel-rounded-lg">
            <div className="msgs novel-p-2">
              <div className="flex novel-mb-2 novel-pb-2 novel-border-slate-100 novel-border-b novel-justify-between novel-items-center">
                <Magic1 className="novel-h-6 novel-w-6 translate-y-1 novel-text-purple-400" />
                <span className="novel-font-semibold">Chat with note</span>
                <div className=" novel-flex novel-items-center novel-gap-2">
                  <Trash
                    onClick={() => setMessages([])}
                    className="novel-float-right novel-cursor-pointer novel-w-4 novel-h-4 novel-text-slate-600"
                  />
                  <XIcon
                    onClick={toggleOpen}
                    className="novel-float-right novel-cursor-pointer novel-w-4 novel-h-4 novel-text-slate-600"
                  />
                </div>
              </div>
              <div className=" novel-h-64 novel-overflow-auto">
                {messages.map((m, index) =>
                  m.role === "user" ? (
                    <div
                      className="novel-text-sm novel-mb-3 novel-gap-2 novel-w-full novel-flex novel-items-start novel-justify-end"
                      key={index}>
                      <span className="novel-py-1 novel-px-2 novel-bg-slate-200 novel-rounded-md">
                        {m.content}
                      </span>
                      <span className="novel-py-1 novel-max-w-[200px] novel-px-2 novel-font-semibold novel-bg-slate-100 novel-rounded-full">
                        <Baby className="novel-w-5 novel-h-5 novel-text-purple-400" />
                      </span>
                    </div>
                  ) : (
                    <div
                      className="novel-text-sm novel-mb-3 novel-gap-2 novel-w-full novel-flex novel-items-start novel-justify-start"
                      key={index}>
                      <span className="novel-py-1 novel-px-2 novel-font-semibold novel-bg-slate-100 novel-rounded-full">
                        <Bot className="novel-w-5 novel-h-5 novel-text-purple-400" />
                      </span>
                      <span className="novel-py-1novel-max-w-[200px] novel-px-2 novel-bg-slate-200 novel-rounded-md">
                        {m.content}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="novel-flex novel-p-2 novel-items-end novel-justify-center">
              <Bot
                onClick={toggleOpen}
                className="novel-h-5 novel-cursor-pointer novel-mr-2 novel-mb-2 novel-w-5 translate-y-1 novel-text-purple-400"
              />
              <textarea
                ref={inputRef}
                maxLength={300}
                style={{ maxHeight: "150px", minHeight: "36px" }}
                rows={1}
                className="novel-flex-grow novel-border-l novel-border-y novel-border-gray-100 novel-shadow-inner novel-rounded-l-lg novel-px-4 novel-py-1 focus:novel-outline-none"
                placeholder="Ask note..."
                value={input}
                onChange={handleInputChange}
              />
              <form onSubmit={handleSubmit}>
                <button
                  onClick={handleChat}
                  type="submit"
                  className="novel-px-2 novel-py-2 novel-bg-slate-100 novel-text-white novel-rounded-r-lg hover:novel-bg-slate-300">
                  {!isLoading ? (
                    <Send className="novel-h-5 novel-w-5 novel-text-stone-600" />
                  ) : (
                    <PauseCircle className="novel-h-5 novel-animate-pulse novel-w-5 novel-text-stone-600" />
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <button
            className="novel-p-3 hover:-novel-translate-x-6 novel-transition-all novel-bg-white novel-shadow-lg novel-rounded-full"
            onClick={toggleOpen}>
            <Bot className="novel-h-5 novel-w-5 translate-y-1 novel-text-purple-400" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
