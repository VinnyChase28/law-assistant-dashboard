"use client";

import * as React from "react";
import { ChevronDownCircle, PlusSquare } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type DropdownMenuCheckboxesProps = {
  onStartNewChat: () => void;
  isChatWithDocsEnabled: boolean;
  toggleChatWithDocs: () => void;
};

export function DropdownMenuCheckboxes({
  onStartNewChat,
  isChatWithDocsEnabled,
  toggleChatWithDocs,
}: DropdownMenuCheckboxesProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ChevronDownCircle className="h-6 w-6 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={isChatWithDocsEnabled}
          onCheckedChange={toggleChatWithDocs}
        >
          Document Chat
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onStartNewChat}>
          <PlusSquare className="h-4 w-4" />
          <p className="pl-2">Start New Chat</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
