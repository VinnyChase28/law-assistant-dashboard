"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { ScrollArea } from "@/components/ui/scroll-area"; // Ensure this component is correctly imported
import { api } from "src/trpc/react";

type ChatMessage = {
  role: "user" | "system";
  content: string;
  isFinal?: boolean;
};

const VectorSearchComponent: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  //mutations
  const convertTextToVector = api.vector.convertTextToVector.useMutation();
  const vectorSearch = api.vector.vectorSearch.useMutation();
  const generateDocumentPrompt = api.llm.generateDocumentPrompt.useMutation();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const vector = await convertTextToVector.mutateAsync({
      text: inputMessage,
    });

    const searchResults = await vectorSearch.mutateAsync({
      queryVector: vector,
      topK: 3,
    });

    const prompt = await generateDocumentPrompt.mutateAsync({
      userQuery: inputMessage,
      pages: searchResults.map((result) => ({
        fileName: result.fileName,
        textData: result.textData,
        pageNumber: result.pageNumber,
      })),
    });

    setChatMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: inputMessage, isFinal: true },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let systemResponse = "";

        setChatMessages((prevMessages) => [
          ...prevMessages,
          { role: "system", content: "", isFinal: false },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const textChunk = decoder.decode(value, { stream: true });
          systemResponse += textChunk;

          setChatMessages((prevMessages) => {
            const lastMessageIndex = prevMessages.length - 1;
            const lastMessage = prevMessages[lastMessageIndex];
            if (lastMessage?.role === "system" && !lastMessage.isFinal) {
              const updatedMessage = {
                ...lastMessage,
                content: systemResponse,
              };
              return [
                ...prevMessages.slice(0, lastMessageIndex),
                updatedMessage,
              ];
            }
            return prevMessages;
          });
        }

        setChatMessages((prevMessages) => {
          const lastMessageIndex = prevMessages.length - 1;
          const lastMessage = prevMessages[lastMessageIndex];
          if (lastMessage?.role === "system" && !lastMessage.isFinal) {
            const finalizedMessage = { ...lastMessage, isFinal: true };
            return [
              ...prevMessages.slice(0, lastMessageIndex),
              finalizedMessage,
            ];
          }
          return prevMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInputMessage("");
  };

  return (
    <div className="chat-app-container relative mx-auto flex w-full max-w-2xl flex-col py-24">
      <ScrollArea className="h-[600px] max-h-[800px] rounded-md p-4">
        <ul className="list-none">
          {chatMessages.map((msg, index) => (
            <li
              key={index}
              className={`chat-message rounded-lg shadow ${
                msg.role === "user"
                  ? "user-message ml-auto bg-blue-200 bg-opacity-25"
                  : "system-message mr-auto bg-gray-200 bg-opacity-25"
              }`}
            >
              <span className="sender-name block text-sm font-bold">
                {msg.role === "user" ? "You" : "System"}
              </span>
              <div>
                <ReactMarkdown
                  children={msg.content.replace(/\n/gi, "&nbsp; \n")}
                  remarkPlugins={[remarkBreaks]}
                  rehypePlugins={[rehypeRaw]}
                  className="markdown-content list-inside list-decimal"
                />
              </div>
            </li>
          ))}
          <div ref={chatEndRef} />
        </ul>
      </ScrollArea>

      <div className="input-container fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 transform px-4 pb-4">
        <input
          className="message-input w-full rounded p-2 shadow"
          placeholder="Type your message here..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          autoFocus
        />
      </div>
    </div>
  );
};

export default VectorSearchComponent;
