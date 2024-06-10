"use client";

import { AnimatePresence, motion } from "framer-motion";

import { type Chat } from "@/lib/types";

import { removeChat, shareChat } from "../actions";

import { SidebarActions } from "./sidebar-actions";
import { SidebarItem } from "./sidebar-item";

interface SidebarItemsProps {
  chats?: Chat[];
}

export function SidebarItems({ chats }: SidebarItemsProps) {
  if (!chats?.length) return null;

  return (
    <AnimatePresence>
      {chats.map(
        (chat, index) =>
          chat && (
            <motion.div
              key={chat?.id}
              exit={{
                opacity: 0,
                height: 0,
              }}
            >
              <SidebarItem index={index} chat={chat}>
                <SidebarActions
                  chat={chat}
                  removeChat={removeChat}
                  shareChat={shareChat}
                />
              </SidebarItem>
            </motion.div>
          ),
      )}
    </AnimatePresence>
  );
}