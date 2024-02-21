import React, { use, useEffect, useRef, useState } from "react";
import { useChat, Message } from "ai/react";
import { Button } from "../ui/button";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "src/trpc/react";

type ExtendedMessage = Message & {
  role: string;
  content: string;
};

export function Chat({
  handler,
  documentQuestion,
}: {
  handler: any;
  documentQuestion?: boolean;
}) {
  const convertTextToVector = api.vector.convertTextToVector.useMutation();
  const vectorSearch = api.vector.vectorSearch.useMutation();
  const generateDocumentPrompt = api.llm.generateDocumentPrompt.useMutation();

  const [initialMessages] = useState<ExtendedMessage[]>([
    {
      id: "initial-1",
      role: "system",
      content: "Welcome to Casey! Type your message below to start chatting.",
    },
  ]);

  const { messages, input, handleInputChange, setMessages, handleSubmit } =
    useChat({
      api: handler,
      initialMessages,
    });

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("messages", messages);
  }, [messages]);

  const customHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    if (documentQuestion) {
      try {
        // Step 1: Convert text to vector
        const vector = await convertTextToVector.mutateAsync({
          text: input,
        });

        // Step 2: Perform vector search with the obtained vector
        const searchResults = await vectorSearch.mutateAsync({
          queryVector: vector,
        });

        // Step 3: Generate document prompt based on the search results
        const prompt = await generateDocumentPrompt.mutateAsync({
          userQuery: input,
          pages: searchResults.map((result) => ({
            fileName: result.fileName,
            textData: result.textData,
            pageNumber: result.pageNumber,
          })),
        });

        // Step 4: Add the generated prompt as a new message
        const newMessage: ExtendedMessage = {
          id: `generated-${Date.now()}`,
          role: "system", // Or 'user', depending on how you want to display it
          content: prompt, // Use the actual prompt content from your response
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
      } catch (error) {
        console.error(
          "Error during the document prompt generation process:",
          error,
        );
      }
    } else {
      handleSubmit(e);
    }
  };

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
                {m.role === "user" ? "You" : "Casey"}
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
        <form onSubmit={customHandleSubmit} className="w-full">
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
