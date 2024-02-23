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
import { Separator } from "@/components/ui/separator"; // Import Separator
import VectorSearchComponent from "./chat-docs";
import CreateReportComponent from "./generate-report";
import { ArrowLeft } from "lucide-react";

const ChatBubble = () => {
  const el = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showVectorSearch, setShowVectorSearch] = useState(false);
  const [showCreateReport, setShowCreateReport] = useState(false);
  let typed: Typed;

  useEffect(() => {
    if (dialogOpen && el.current) {
      typed = new Typed(el.current, {
        strings: [
          "Hi! I'm Casy. You can chat with me for general help, use my memory to chat with your selected docs, or create reports from the documents stored in your files table. What would you like to do?",
        ],
        typeSpeed: 25,
      });
    }

    return () => {
      if (typed) {
        typed.destroy();
      }
      setShowVectorSearch(false);
      setShowCreateReport(false);
    };
  }, [dialogOpen]);

  const handleBack = () => {
    setShowVectorSearch(false);
    setShowCreateReport(false);
  };

  const handleChatWithDocs = () => {
    setShowVectorSearch(true);
  };

  const handleCreateReport = () => {
    setShowCreateReport(true);
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
            {(showVectorSearch || showCreateReport) && (
              <button onClick={handleBack} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <DialogTitle>Casy AI</DialogTitle>
          </div>
        </DialogHeader>
        <div className="overflow-y-auto">
          {showVectorSearch && <VectorSearchComponent />}
          {showCreateReport && <CreateReportComponent />}
        </div>
        {!showVectorSearch && !showCreateReport && (
          <div className="p-2">
            <span ref={el} />
            <Separator className="my-4" /> {/* Separator above buttons */}
            <div className="my-4 flex items-center justify-around">
              <Button variant="secondary" onClick={handleChatWithDocs}>
                Chat
              </Button>
              <Separator orientation="vertical" className="h-6" />{" "}
              {/* Vertical separator */}
              <Button variant="secondary" onClick={handleCreateReport}>
                Report
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatBubble;
