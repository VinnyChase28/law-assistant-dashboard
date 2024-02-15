"use client";

import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import VectorSearchComponent from "./chat-docs";
import ChatComponent from "../casey/page";

const ChatBubble = () => {
  const el = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showVectorSearch, setShowVectorSearch] = useState(false);
  const [showGeneralChat, setShowGeneralChat] = useState(false); // State to control General Chat visibility
  let typed: Typed;

  useEffect(() => {
    if (dialogOpen && el.current) {
      typed = new Typed(el.current, {
        strings: [
          "Hi! I'm Casey. You can chat with me for general help, use my memory to chat with your selected docs, or create reports from the documents stored in your files table. What would you like to do?",
        ],
        typeSpeed: 25,
      });
    }

    return () => {
      if (typed) {
        typed.destroy();
      }
      // Reset both components when dialog closes or component unmounts
      setShowVectorSearch(false);
      setShowGeneralChat(false);
    };
  }, [dialogOpen]);

  const handleChat = () => {
    setShowGeneralChat(true); // Open General Chat
  };

  const handleChatWithDocs = () => {
    setShowVectorSearch(true); // Open Vector Search
  };

  return (
    <Dialog onOpenChange={(isOpen) => setDialogOpen(isOpen)}>
      <DialogTrigger asChild>
        <button className="fixed bottom-10 right-10 z-20 rounded-full">
          <ChatBubbleIcon />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Casey AI</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto">
          {showVectorSearch && <VectorSearchComponent />}
          {showGeneralChat && <ChatComponent />}{" "}
          {/* Render General Chat based on state */}
        </div>
        {!showVectorSearch &&
          !showGeneralChat && ( // Adjust condition to hide buttons when any component is shown
            <div className="p-2">
              <span ref={el} />
              <div className="my-4 flex justify-around">
                <Button variant="secondary" onClick={handleChat}>
                  General chat
                </Button>
                <Button variant="secondary" onClick={handleChatWithDocs}>
                  Chat with docs
                </Button>
                <Button variant="secondary">Create report</Button>
              </div>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatBubble;
