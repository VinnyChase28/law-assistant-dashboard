'use client'

import React, { use, useEffect, useRef, useState } from "react";
import { useChat, Message } from "ai/react";
import { Button } from "../ui/button";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { ScrollArea } from "@/components/ui/scroll-area";

type ExtendedMessage = Message & {
  role: string;
  content: string;
};

export function Chat({ handler }: { handler: any }) {
  const [initialMessages] = useState<ExtendedMessage[]>([
    {
      id: "initial-1",
      role: "system",
      content: "Welcome to Casy! Type your message below to start chatting.",
    },
  ]);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: handler,
    initialMessages,
  });

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-app-container relative mx-auto flex w-full max-w-2xl flex-col py-24">
      <ScrollArea className="h-[600px] max-h-[800px] rounded-md p-4">
        <ul className="list-none">
          {messages.map((m, index) => (
            <li
              key={index}
              className={`chat-message rounded-lg shadow ${
                m.role === "user"
                  ? "user-message ml-auto bg-blue-200 bg-opacity-25"
                  : "casey-message mr-auto bg-gray-200 bg-opacity-25"
              }`}
            >
              <span className="sender-name block text-sm font-bold">
                {m.role === "user" ? "You" : "Casy"}
              </span>
              <div>
                <ReactMarkdown
                  remarkPlugins={[remarkBreaks]}
                  rehypePlugins={[rehypeRaw]}
                  className="list-inside list-decimal"
                >
                  {m.content.replace(/\n/gi, "&nbsp; \n")}
                </ReactMarkdown>
              </div>
            </li>
          ))}
          <div ref={chatEndRef} />
        </ul>
      </ScrollArea>

      <div className="input-container fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 transform px-4 pb-4">
        <form onSubmit={handleSubmit} className="w-full">
          <input
            className="message-input w-full rounded p-2 shadow"
            placeholder="Type your message here..."
            value={input}
            onChange={handleInputChange}
            autoFocus
          />
        </form>
        <div className="action-buttons flex justify-center gap-2 pt-4">
          <Button variant="destructive">Reset</Button>
        </div>
      </div>
    </div>
  );
}
