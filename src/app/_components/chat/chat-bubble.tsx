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

const ChatBubble = () => {
  const el = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showVectorSearch, setShowVectorSearch] = useState(false); // New state
  let typed: Typed;

  useEffect(() => {
    // Initialize Typed only if the dialog is open and the element exists
    if (dialogOpen && el.current) {
      typed = new Typed(el.current, {
        strings: [
          "Hi! I'm Casey. You can chat with me for general help, use my memory to chat with your selected docs, or create reports from the documents stored in your files table. What would you like to do?",
        ],
        typeSpeed: 25,
      });
    }

    // Cleanup function
    return () => {
      if (typed) {
        typed.destroy();
      }
      // Reset showVectorSearch when dialog closes
      setShowVectorSearch(false);
    };
  }, [dialogOpen]);

  const handleChatWithDocs = () => {
    setShowVectorSearch(true);
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
          {showVectorSearch && <VectorSearchComponent />}{" "}
          {/* Conditionally render VectorSearchComponent */}
        </div>
        {!showVectorSearch && ( // Conditionally render buttons
          <div className="p-2">
            <span ref={el} />
            <div className="my-4 flex justify-around">
              <Button variant="secondary">General chat</Button>
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
