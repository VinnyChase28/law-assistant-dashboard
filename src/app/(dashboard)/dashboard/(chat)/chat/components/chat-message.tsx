// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx
import React from "react"; // Add this line at the beginning of your file

import { type Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@components/ui/codeblock";

import { ChatMessageActions } from "./chat-message-actions";
import { IconOpenAI, IconUser } from "./icons";
import { MemoizedReactMarkdown } from "./markdown";

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn("group relative mb-4 flex items-start md:-ml-12")}
      {...props}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          message.role === "user"
            ? "bg-background"
            : "bg-primary text-primary-foreground",
        )}
      >
        {message.role === "user" ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            // @ts-ignore
            code({ node, inline, className, children, ...props }) {
              // @ts-ignore
              if (children.length) {
                // @ts-ignore
                if (children[0] == "▍") {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  );
                }
                // @ts-ignore
                children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className || "");

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </div>
    </div>
  );
}
