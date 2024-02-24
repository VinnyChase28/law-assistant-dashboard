"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "src/trpc/react";
import { Toggle } from "@/components/ui/toggle";
import { useChatWithDocsStore } from "src/store/store";

type ChatMessage = {
  role: "Me" | "Casy";
  content: string;
  isFinal?: boolean;
};

interface ToggleWithTextProps {
  onChange: () => void;
  isChecked: boolean;
}

const TypingIndicator = () => {
  return (
    <div className="typing-indicator flex items-center space-x-1">
      <span className="dot h-2 w-2 animate-bounce rounded-full bg-gray-300"></span>
      <span className="dot animate-bounce200 h-2 w-2 rounded-full bg-gray-300"></span>
      <span className="dot animate-bounce400 h-2 w-2 rounded-full bg-gray-300"></span>
    </div>
  );
};

function ToggleWithText({ onChange, isChecked }: ToggleWithTextProps) {
  return (
    <div className="flex items-center justify-start">
      <Toggle
        aria-label="Toggle chat with docs feature"
        pressed={isChecked}
        className="mr-2 max-w-xs"
        size="lg"
        onClick={onChange}
      >
        Chat with Docs
      </Toggle>
    </div>
  );
}

const VectorSearchComponent: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "Casy",
      content:
        "Welcome! Type your message below to start chatting with your regulatory documents.",
    },
  ]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isAIResponding, setIsAIResponding] = useState(false);
  const { isChatWithDocsEnabled, toggleChatWithDocs } = useChatWithDocsStore();

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  //mutations
  const convertTextToVector = api.vector.convertTextToVector.useMutation();
  const vectorSearch = api.vector.vectorSearch.useMutation();
  const generateDocumentPrompt = api.llm.generateDocumentPrompt.useMutation();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Function to handle toggle change
  const handleToggleChange = () => {
    toggleChatWithDocs(); // This will now toggle the state in the global store
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isStreaming) return;
    setIsStreaming(true);
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { role: "Me", content: inputMessage, isFinal: true },
    ]);

    // Define a variable to hold the message that will be sent to the API
    let messageToSend = inputMessage;

    // Only proceed with TRPC procedures if isDocsFeatureEnabled is true
    if (isChatWithDocsEnabled) {
      const vector = await convertTextToVector.mutateAsync({
        text: inputMessage,
      });

      const searchResults = await vectorSearch.mutateAsync({
        queryVector: vector,
        topK: 4,
      });

      const prompt = await generateDocumentPrompt.mutateAsync({
        userQuery: inputMessage,
        pages: searchResults.map((result) => ({
          fileName: result.fileName,
          textData: result.textData,
          pageNumber: result.pageNumber,
        })),
      });

      // Update the message to send to the API based on the TRPC procedures
      messageToSend = prompt;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: messageToSend,
            },
          ],
        }),
      });

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let systemResponse = "";

        setChatMessages((prevMessages) => [
          ...prevMessages,
          { role: "Casy", content: "", isFinal: false },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          setIsAIResponding(false);

          const textChunk = decoder.decode(value, { stream: true });
          systemResponse += textChunk;

          setChatMessages((prevMessages) => {
            const lastMessageIndex = prevMessages.length - 1;
            const lastMessage = prevMessages[lastMessageIndex];
            if (lastMessage?.role === "Casy" && !lastMessage.isFinal) {
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
          if (lastMessage?.role === "Casy" && !lastMessage.isFinal) {
            const finalizedMessage = { ...lastMessage, isFinal: true };
            return [
              ...prevMessages.slice(0, lastMessageIndex),
              finalizedMessage,
            ];
          }
          return prevMessages;
        });
      }

      setIsStreaming(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsStreaming(false);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="chat-app-container relative mx-auto flex w-full max-w-2xl flex-col py-24">
      <ToggleWithText
        onChange={handleToggleChange}
        isChecked={isChatWithDocsEnabled}
      />

      <ScrollArea className="h-[600px] max-h-[800px] rounded-md p-4">
        <ul className="list-none">
          {chatMessages.map((msg, index) => (
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
              <div>
                <ReactMarkdown
                  remarkPlugins={[remarkBreaks]}
                  rehypePlugins={[rehypeRaw]}
                  className="markdown-content list-inside list-decimal"
                >
                  {msg.content.replace(/\n/gi, "&nbsp; \n")}
                </ReactMarkdown>
              </div>
            </li>
          ))}
          {/* Conditionally render the TypingIndicator here */}
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
            if (e.key === "Enter") {
              sendMessage();
              setInputMessage("");
              setIsAIResponding(true);
            }
          }}
          autoFocus
        />
      </div>
    </div>
  );
};

export default VectorSearchComponent;
