"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";

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
        <MoreHorizontal className="h-5 w-5" />
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
          Start New Chat
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
