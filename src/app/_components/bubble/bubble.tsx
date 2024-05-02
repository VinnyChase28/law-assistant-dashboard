"use client";
import React, { useState } from "react";

import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { ArrowLeft } from "lucide-react";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Separator } from "@components/ui/separator"; // Import Separator

import AlertComponent from "../alert";
import VectorSearchComponent from "../chat/chat-docs";
import CreateReportComponent from "../generate-report/generate-report";
import { Badge } from "../ui/badge";

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
                <ArrowLeft className="h-6 w-6 opacity-50" />
              </button>
            )}
            <DialogTitle>
              Law Assistant AI <Badge>Alpha</Badge>
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="overflow-y-auto">
          {showVectorSearch && <VectorSearchComponent />}
          {showCreateReport && <CreateReportComponent />}
        </div>
        {!showVectorSearch && !showCreateReport && (
          <div className="p-2">
            <AlertComponent
              description="Hi! I'm Law Assistant AI. You can chat with me for general help, use my memory to chat with your selected docs, or create reports from the documents stored in your files table. What would you like to do?"
              title="Law Assistant AI"
              iconType="info"
            />

            <div className="my-4 flex items-center justify-around">
              <Button variant="secondary" onClick={handleChatWithDocs}>
                Chat
              </Button>
              <Separator orientation="vertical" className="h-6" />{" "}
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
