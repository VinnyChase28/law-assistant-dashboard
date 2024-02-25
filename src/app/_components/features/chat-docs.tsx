"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "src/trpc/react";
import { Toggle } from "@/components/ui/toggle";
import { useChatWithDocsStore, useChatSessionStore } from "src/store/store";

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
  const chatSessionId = useChatSessionStore((state) => state.chatSessionId);
  const getAllMessagesForSession = api.chat.getAllMessagesForSession.useQuery({
    chatSessionId: chatSessionId || "",
  });
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  //mutations
  const convertTextToVector = api.vector.convertTextToVector.useMutation();
  const vectorSearch = api.vector.vectorSearch.useMutation();
  const generateDocumentPrompt = api.llm.generateDocumentPrompt.useMutation();
  const createChatSessionMutation = api.chat.createChatSession.useMutation();
  const createChatMessage = api.chat.createChatMessage.useMutation();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    const startChatSession = async () => {
      // Logic to determine if a new session needs to be created
      const session = await createChatSessionMutation.mutateAsync();
      useChatSessionStore.setState({ chatSessionId: session.id });
    };

    startChatSession();
  }, []);

  useEffect(() => {
    const loadChatMessages = async () => {
      if (chatSessionId) {
        // Fetch chat messages for the current session
        const messages = await getAllMessagesForSession.data;
        console.log("messages", messages);
        // Update local state with fetched messages
        if (messages)
          setChatMessages(
            messages.map((msg) => ({
              role: msg.role === "USER" ? "Me" : "Casy",
              content: msg.content,
              isFinal: true,
            })),
          );
      }
    };

    loadChatMessages();
  }, [chatSessionId]); // Re-run this effect if the chatSessionId changes

  // Function to handle toggle change
  const handleToggleChange = () => {
    toggleChatWithDocs(); // This will now toggle the state in the global store
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isStreaming || !chatSessionId) return;
    setIsStreaming(true);

    // Add the user's message to the local state for immediate feedback
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { role: "Me", content: inputMessage, isFinal: true },
    ]);

    let prompt = inputMessage; // Default to user input for cases where chat with docs is not enabled

    // Handle chat with docs logic
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
      
      await createChatMessage.mutateAsync({
        chatSessionId,
        content: inputMessage,
        prompt: prompt,
        role: "USER",
      });
    } else {
      await createChatMessage.mutateAsync({
        chatSessionId,
        content: inputMessage,
        role: "USER",
      });
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
              content: prompt, // Send the full prompt including user message
            },
          ],
        }),
      });

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let systemResponse = "";
        let isFirstChunk = true; // Flag to track the first chunk
        setIsAIResponding(true); // Start showing the typing indicator

        while (true) {
          const { done, value } = await reader.read();
          const textChunk = decoder.decode(value, { stream: true });
          systemResponse += textChunk;
          if (isFirstChunk) {
            setIsAIResponding(false); // Stop the typing indicator after receiving the first chunk
            isFirstChunk = false; // Ensure this block only runs once
          }

          // Update local state with the ongoing response
          setChatMessages((prevMessages) => {
            const messagesCopy = [...prevMessages];
            const lastMessage = messagesCopy[messagesCopy.length - 1];

            // If the last message is from the AI and is not final, update it
            if (
              lastMessage &&
              lastMessage.role === "Casy" &&
              !lastMessage.isFinal
            ) {
              lastMessage.content = systemResponse;
            } else {
              // Otherwise, add a new message for the AI's ongoing response
              messagesCopy.push({
                role: "Casy",
                content: systemResponse,
                isFinal: false,
              });
            }

            return messagesCopy;
          });

          if (done) {
            // Once the final chunk is received, update the last message to mark it as final
            setChatMessages((prevMessages) => {
              const messagesCopy = [...prevMessages];
              const lastMessage = messagesCopy[messagesCopy.length - 1];
              if (lastMessage && lastMessage.role === "Casy") {
                lastMessage.isFinal = true;
              }
              return messagesCopy;
            });

            setIsAIResponding(false); // Stop the typing indicator
            break;
          }
        }

        // Save the AI's complete response to the database
        await createChatMessage.mutateAsync({
          chatSessionId,
          content: systemResponse,
          role: "AI",
        });
      }
    } catch (error) {
      console.error("Error sending message or receiving response:", error);
      setIsAIResponding(false); // Ensure the typing indicator is stopped in case of an error
    } finally {
      setInputMessage(""); // Clear the input field after sending the message
      setIsStreaming(false); // Reset streaming state
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
