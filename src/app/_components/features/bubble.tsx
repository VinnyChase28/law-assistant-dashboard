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
import ChatComponent from "./chat-component";
import CreateReportComponent from "./generate-report";
import { ArrowLeft } from "lucide-react"; // Assuming ArrowLeft is the correct import

const ChatBubble = () => {
  const el = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showVectorSearch, setShowVectorSearch] = useState(false);
  const [showGeneralChat, setShowGeneralChat] = useState(false);
  const [showCreateReport, setShowCreateReport] = useState(false); // State for showing Create Report
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
      setShowVectorSearch(false);
      setShowGeneralChat(false);
      setShowCreateReport(false); // Reset Create Report view when dialog closes
    };
  }, [dialogOpen]);

  const handleBack = () => {
    setShowVectorSearch(false);
    setShowGeneralChat(false);
    setShowCreateReport(false); // Allow going back from Create Report view
  };

  const handleChat = () => {
    setShowGeneralChat(true);
  };

  const handleChatWithDocs = () => {
    setShowVectorSearch(true);
  };

  const handleCreateReport = () => {
    setShowCreateReport(true); // Show Create Report component
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
          <div className="flex items-center">
            {(showVectorSearch || showGeneralChat || showCreateReport) && (
              <button onClick={handleBack} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <DialogTitle>Casey AI</DialogTitle>
          </div>
        </DialogHeader>
        <div className="overflow-y-auto">
          {showVectorSearch && <VectorSearchComponent />}
          {showGeneralChat && <ChatComponent />}
          {showCreateReport && <CreateReportComponent />}{" "}
          {/* Render the Create Report component */}
        </div>
        {!showVectorSearch && !showGeneralChat && !showCreateReport && (
          <div className="p-2">
            <span ref={el} />
            <div className="my-4 flex justify-around">
              <Button variant="secondary" onClick={handleChat}>
                General chat
              </Button>
              <Button variant="secondary" onClick={handleChatWithDocs}>
                Chat with docs
              </Button>
              <Button variant="secondary" onClick={handleCreateReport}>
                {" "}
                {/* Add onClick handler */}
                Create report
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatBubble;
