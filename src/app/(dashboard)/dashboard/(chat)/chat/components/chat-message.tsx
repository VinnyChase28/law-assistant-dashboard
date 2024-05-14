import { type ReactNode } from "react";

import { type Message } from "ai";
import { type PluggableList } from "node_modules/react-markdown/lib";
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

interface CodeComponentProps {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
  node?: any;
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
          remarkPlugins={[remarkGfm, remarkMath] as PluggableList}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({
              inline,
              className,
              children,
              ...props
            }: CodeComponentProps) {
              if (children && typeof children === "string" && children.length) {
                if (children.startsWith("▍")) {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  );
                }

                children = children.replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className ?? "");

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
                  language={(match && match[1]) ?? ""}
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
