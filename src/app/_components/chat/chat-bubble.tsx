"use client";
import React from "react";
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
        <div className="overflow-y-auto">this is for messages</div>
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
