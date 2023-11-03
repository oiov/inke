import { Editor } from "@tiptap/react";
import { useContext, useEffect, useRef, useState } from "react";
import { NovelContext } from "../provider";
import { useChat } from "ai/react";
import {
  Baby,
  Bot,
  Clipboard,
  Minus,
  PauseCircle,
  RefreshCcw,
  Send,
  Trash,
  Trash2,
} from "lucide-react";
import Magic1 from "@/ui/icons/magic-1";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

export function ChatBot({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { completionApi, plan } = useContext(NovelContext);

  const {
    messages,
    setMessages,
    input,
    isLoading,
    reload,
    handleInputChange,
    handleSubmit,
  } = useChat({
    id: "ai-bot",
    api: `${completionApi}/bot`,
    body: { plan, system: editor.getText() },
    initialMessages: [
      {
        id: "start",
        role: "system",
        content: "Here, ask me about your note :)",
      },
    ],
    onError: (err) => {
      if (
        err.message !== "Failed to fetch" &&
        err.message !== "network error"
      ) {
        toast.error(err.message);
      }
    },
  });

  useEffect(() => {
    inputRef.current && inputRef.current?.focus();
  });

  const handleChat = () => {
    if (isLoading) {
      stop();
      return;
    }
    if (!inputRef.current?.value) return;
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const toggleOpen = () => {
    editor.chain().blur();
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={
        `${isOpen ? "novel-bottom-3" : "novel-bottom-16"}` +
        " novel-fixed z-[1009] novel-right-3 novel-animate-in novel-fade-in novel-slide-in-from-bottom-1"
      }>
      <motion.div
        className="novel-rounded-full"
        initial={{ borderRadius: "50%", x: 0 }}
        animate={{ borderRadius: isOpen ? "0%" : "50%", x: isOpen ? 0 : 35 }}
        transition={{ duration: 0.2 }}>
        {isOpen ? (
          <div className="chat novel-border novel-relative novel-w-[350px] novel-border-slate-100  novel-bg-white novel-shadow-lg novel-rounded-lg">
            <div className="msgs novel-p-2">
              <div className="flex novel-mb-2 novel-pb-2 novel-border-slate-100 novel-border-b novel-justify-between novel-items-center">
                <Magic1 className="novel-h-6 novel-w-6 translate-y-1 novel-text-cyan-400" />
                <span className="novel-font-semibold">Chat with note</span>
                <div className="novel-flex novel-items-center novel-gap-3">
                  <Trash
                    onClick={() => setMessages([])}
                    className="novel-float-right novel-rounded-md novel-cursor-pointer novel-w-4 novel-h-4 hover:novel-text-red-300 novel-text-slate-600"
                  />
                  <Minus
                    onClick={toggleOpen}
                    className="novel-float-right novel-rounded-md novel-cursor-pointer novel-w-6 novel-h-6 novel-px-1 hover:novel-bg-slate-200 novel-text-slate-600"
                  />
                </div>
              </div>
              <div className="novel-h-80 novel-pb-10 novel-overflow-auto">
                {messages.map((m, index) =>
                  m.role === "user" ? (
                    <motion.div
                      className="novel-text-sm novel-group novel-mb-3 novel-gap-2 novel-w-full novel-flex novel-items-start novel-justify-end"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      key={index}>
                      <div className="novel-hidden group-hover:novel-block">
                        <Clipboard
                          onClick={() =>
                            navigator.clipboard.writeText(m.content)
                          }
                          className="novel-w-3 novel-mb-1 novel-text-slate-400 active:novel-text-green-500 novel-h-3 novel-cursor-pointer hover:novel-text-slate-300 "
                        />
                        <Trash2
                          onClick={() => {
                            const new_list = messages.filter(
                              (i) => i.content !== m.content
                            );
                            setMessages(new_list);
                          }}
                          className="novel-w-3 novel-text-slate-400 active:novel-text-red-500 novel-h-3 novel-cursor-pointer hover:novel-text-slate-300 "
                        />
                      </div>
                      <ReactMarkdown className="novel-py-1 novel-text-slate-700 novel-max-w-[260px] novel-px-2 novel-bg-slate-200 novel-rounded-md">
                        {m.content}
                      </ReactMarkdown>
                      <span className="novel-py-1 novel-px-2 novel-font-semibold novel-bg-slate-100 novel-rounded-full">
                        <Baby className="novel-w-5 novel-h-5 novel-text-blue-400" />
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="novel-text-sm novel-group novel-mb-3 novel-gap-2 novel-w-full novel-flex novel-items-start novel-justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      key={index}>
                      <span className="novel-py-1 novel-px-2 novel-font-semibold novel-bg-slate-100 novel-rounded-full">
                        <Bot className="novel-w-5 novel-h-5 novel-text-cyan-400" />
                      </span>
                      <ReactMarkdown className="novel-py-1 novel-text-slate-700 novel-max-w-[260px] novel-px-2 novel-bg-slate-200 novel-rounded-md">
                        {m.content}
                      </ReactMarkdown>
                      <div className="novel-hidden novel-h-full novel-mt-auto group-hover:novel-block">
                        <Clipboard
                          onClick={() =>
                            navigator.clipboard.writeText(m.content)
                          }
                          className="novel-w-3 novel-mb-1 novel-text-slate-400 active:novel-text-green-500 novel-h-3 novel-cursor-pointer hover:novel-text-slate-300 "
                        />
                        <Trash2
                          onClick={() => {
                            const new_list = messages.filter(
                              (i) => i.content !== m.content
                            );
                            setMessages(new_list);
                          }}
                          className="novel-w-3 novel-text-slate-400 active:novel-text-red-500 novel-h-3 novel-cursor-pointer hover:novel-text-slate-300 "
                        />
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>

            <div className="novel-flex novel-p-2 novel-items-end novel-justify-center">
              <Bot
                onClick={toggleOpen}
                className="novel-h-5 novel-cursor-pointer novel-mr-2 novel-mb-2.5 novel-w-5 translate-y-1 novel-text-cyan-500"
              />
              <textarea
                ref={inputRef}
                maxLength={300}
                style={{ maxHeight: "150px", minHeight: "40px" }}
                rows={1}
                className="novel-flex-grow novel-text-sm novel-border-l novel-border-y novel-border-gray-100 novel-shadow-inner novel-rounded-l-lg novel-px-4 novel-py-2 focus:novel-outline-none"
                placeholder="Ask note..."
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
              <form onSubmit={handleSubmit}>
                <button
                  onClick={handleChat}
                  type="submit"
                  className="novel-px-3 novel-py-3 novel-bg-slate-100 novel-text-white novel-rounded-r-lg hover:novel-bg-slate-300">
                  {!isLoading ? (
                    <Send className="novel-h-4 novel-w-4 novel-text-blue-400" />
                  ) : (
                    <PauseCircle className="novel-h-4 novel-animate-pulse novel-w-4 novel-text-slate-600" />
                  )}
                </button>
              </form>
            </div>

            {isLoading && (
              <div
                onClick={stop}
                className="novel-absolute novel-animate-pulse novel-cursor-pointer novel-bottom-16 novel-z-10 novel-left-1/2 novel-transform novel--translate-x-1/2 novel-px-4 novel-py-1 novel-flex novel-justify-center novel-items-center novel-gap-1 novel-border novel-rounded-md novel-border-slate-200 novel-bg-slate-50 hover:novel-bg-slate-300">
                <PauseCircle className="novel-w-4 novel-h-4 novel-text-slate-500" />
                <span className="novel-text-sm novel-text-slate-500">
                  Abort
                </span>
              </div>
            )}
            {messages.length >= 2 && !isLoading && (
              <div
                onClick={() => reload()}
                className="novel-absolute novel-cursor-pointer novel-bottom-16 novel-z-10 novel-left-1/2 novel-transform novel--translate-x-1/2 novel-px-2 novel-py-1 novel-flex novel-justify-center novel-items-center novel-gap-1 novel-border novel-rounded-md novel-border-slate-200 novel-bg-slate-50 hover:novel-bg-slate-300">
                <RefreshCcw className="novel-w-4 novel-h-4 novel-text-slate-500" />
                <span className="novel-text-sm novel-text-slate-500">
                  Regenerate
                </span>
              </div>
            )}
          </div>
        ) : (
          <button
            className="novel-p-3.5 hover:-novel-translate-x-6 novel-border novel-border-slate-100 novel-transition-all novel-bg-white novel-shadow novel-shadow-purple-100 novel-opacity-75 hover:novel-opacity-100 novel-rounded-full"
            onClick={toggleOpen}>
            <Bot className="novel-h-5 novel-w-5 translate-y-1 novel-text-cyan-500" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
