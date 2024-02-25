"use client";
import React, { useRef, useState } from "react";
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
import VectorSearchComponent from "../chat/chat-docs";
import CreateReportComponent from "../generate-report/generate-report";
import { ArrowLeft } from "lucide-react";
import AlertComponent from "../alert";
const ChatBubble = () => {
  const [showVectorSearch, setShowVectorSearch] = useState(false);
  const [showCreateReport, setShowCreateReport] = useState(false);

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
    <Dialog>
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
            <AlertComponent
              description="Hi! I'm Casy. You can chat with me for general help, use my memory to chat with your selected docs, or create reports from the documents stored in your files table. What would you like to do?"
              title="Casy AI"
              iconType="info"
            />
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
