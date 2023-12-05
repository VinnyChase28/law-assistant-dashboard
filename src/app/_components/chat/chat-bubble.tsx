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
  let typed: Typed;
  useEffect(() => {
    if (dialogOpen) {
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
    };
  }, [dialogOpen]);

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
          <span ref={el} />
        </div>
        <div className="my-4 flex justify-around">
          <Button variant="secondary">General chat</Button>
          <Button variant="secondary">Chat with docs</Button>
          <Button variant="secondary">Create report</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBubble;
