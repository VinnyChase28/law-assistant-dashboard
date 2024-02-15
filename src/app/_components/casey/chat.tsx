import React, { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { Button } from "../ui/button";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // To parse HTML within Markdown

export function Chat({ handler }: { handler: any }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: handler,
  });
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-app-container relative mx-auto flex w-full max-w-md flex-col py-24">
      <div className="chat-container max-h-[400px] overflow-y-auto p-4 pb-[100px]">
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
                {m.role === "user" ? "You" : "Casey"}
              </span>
              <div>
                {/* Render Markdown content, allowing HTML via rehypeRaw */}
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {m.content}
                </ReactMarkdown>
              </div>
            </li>
          ))}
          <div ref={chatEndRef} />
        </ul>
      </div>

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
          <Button variant="default">Search</Button>
          <Button variant="destructive">Reset</Button>
        </div>
      </div>
    </div>
  );
}
