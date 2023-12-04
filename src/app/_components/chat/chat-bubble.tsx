"use client";

import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

const ChatBubble = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Hello! What would you like to do?"],
      typeSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="fixed bottom-10 right-10 z-20 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600">
          <ChatBubbleIcon />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat</DialogTitle>
          <DialogDescription>Enter your message below</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto">
          <span ref={el} />
        </div>
        <div className="my-4 flex justify-around">
          <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            General chat
          </button>
          <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Chat with docs
          </button>
          <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Create report
          </button>
        </div>
        <Input
          type="text"
          className="mt-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="Type a message..."
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChatBubble;
