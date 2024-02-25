"use client";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "src/trpc/react";
import { useChatWithDocsStore, useChatSessionStore } from "src/store/store";
import { ChatMessage } from "./types";
import { TypingIndicator, ToggleWithText } from "./helpers";
import { IconSpinner } from "@/components/ui/icons";

const VectorSearchComponent: React.FC = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isAIResponding, setIsAIResponding] = useState(false);
  const { isChatWithDocsEnabled, toggleChatWithDocs } = useChatWithDocsStore();
  const chatSessionId = useChatSessionStore((state) => state.chatSessionId);

  const { data: messages, isLoading } =
    api.chat.getAllMessagesForSession.useQuery(
      { chatSessionId: chatSessionId ?? "" },
      { enabled: !!chatSessionId },
    );

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const convertTextToVector = api.vector.convertTextToVector.useMutation();
  const vectorSearch = api.vector.vectorSearch.useMutation();
  const generateDocumentPrompt = api.llm.generateDocumentPrompt.useMutation();
  const createChatMessage = api.chat.createChatMessage.useMutation();

  useLayoutEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [chatMessages]);

  useEffect(() => {
    if (messages) {
      setChatMessages(
        messages.map((msg) => ({
          role: msg.role === "USER" ? "Me" : "Casy",
          content: msg.content,
          isFinal: true,
        })),
      );
    }
  }, [messages]);

  const handleToggleChange = () => {
    toggleChatWithDocs();
  };

  const sendMessage = async () => {
    setInputMessage("");
    if (!inputMessage.trim() ?? isStreaming ?? !chatSessionId) return;
    setIsStreaming(true);
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { role: "Me", content: inputMessage, isFinal: true },
    ]);

    let prompt = inputMessage;

    if (isChatWithDocsEnabled) {
      const vector = await convertTextToVector.mutateAsync({
        text: inputMessage,
      });
      const searchResults = await vectorSearch.mutateAsync({
        queryVector: vector,
        topK: 4,
      });
      prompt = await generateDocumentPrompt.mutateAsync({
        userQuery: inputMessage,
        pages: searchResults.map((result) => ({
          fileName: result.fileName,
          textData: result.textData,
          pageNumber: result.pageNumber,
        })),
      });
    }

    await createChatMessage.mutateAsync({
      chatSessionId,
      content: inputMessage,
      prompt,
      role: "USER",
    });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let systemResponse = "";
        let isFirstChunk = true;
        setIsAIResponding(true);

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            updateChatMessagesFinal(systemResponse);
            break;
          }
          systemResponse += decoder.decode(value, { stream: true });
          updateChatMessagesOngoing(systemResponse, isFirstChunk);
          isFirstChunk = false;
        }
      }
    } catch (error) {
      console.error("Error sending message or receiving response:", error);
    } finally {
      resetMessage();
    }
  };

  const updateChatMessagesFinal = async (systemResponse: string) => {
    setChatMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage && lastMessage.role === "Casy") {
        lastMessage.content = systemResponse;
        lastMessage.isFinal = true;
      }
      return [...prevMessages];
    });
    setIsAIResponding(false);

    // Save AI response to the database
    try {
      await createChatMessage.mutateAsync({
        chatSessionId: chatSessionId ?? "",
        content: systemResponse,
        role: "AI",
      });
    } catch (error) {
      console.error("Error saving AI response to the database:", error);
    }
  };

  const updateChatMessagesOngoing = (
    systemResponse: string,
    isFirstChunk: boolean,
  ) => {
    setChatMessages((prevMessages) => {
      const messagesCopy = [...prevMessages];
      if (isFirstChunk) setIsAIResponding(false);
      const lastMessage = messagesCopy[messagesCopy.length - 1];
      if (lastMessage && lastMessage.role === "Casy" && !lastMessage.isFinal) {
        lastMessage.content = systemResponse;
      } else {
        messagesCopy.push({
          role: "Casy",
          content: systemResponse,
          isFinal: false,
        });
      }
      return messagesCopy;
    });
  };

  const resetMessage = () => {
    setInputMessage("");
    setIsStreaming(false);
  };

  return (
    <div className="chat-app-container relative mx-auto flex w-full max-w-2xl flex-col py-24">
      <ToggleWithText
        onChange={handleToggleChange}
        isChecked={isChatWithDocsEnabled}
      />
      <ScrollArea className="h-[600px] max-h-[800px] rounded-md p-4">
        <ul className="list-none">
          {isLoading ? (
            <IconSpinner />
          ) : (
            chatMessages.map((msg, index) => (
              <li
                key={index}
                className={`chat-message rounded-lg shadow ${
                  msg.role === "Me"
                    ? "user-message ml-auto bg-blue-200 bg-opacity-25"
                    : "system-message mr-auto bg-gray-200 bg-opacity-25"
                }`}
              >
                <span className="sender-name block text-sm font-bold">
                  {msg.role === "Me" ? "You" : "Casy"}
                </span>
                <ReactMarkdown
                  remarkPlugins={[remarkBreaks]}
                  rehypePlugins={[rehypeRaw]}
                  className="markdown-content list-inside list-decimal"
                >
                  {msg.content.replace(/\n/gi, "&nbsp; \n")}
                </ReactMarkdown>
              </li>
            ))
          )}
          {isAIResponding && <TypingIndicator />}
          <div ref={chatEndRef} />
        </ul>
      </ScrollArea>
      <div className="input-container fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 transform px-4 pb-4">
        <input
          className="message-input w-full rounded p-2 shadow"
          placeholder="Type your message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" && sendMessage();
          }}
          autoFocus
        />
      </div>
    </div>
  );
};

export default VectorSearchComponent;
