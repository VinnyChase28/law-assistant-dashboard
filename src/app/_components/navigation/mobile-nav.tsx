"use client";

import React from "react";

import { motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@components/ui/accordion";
import { Button } from "@components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@components/ui/drawer";
import {
  platformItems,
  useCasesItems,
  resourcesItems,
  getStartedItems,
  companyItems,
} from "@marketing/config/nav";

const MobileAccordionNav = () => {

  const groups = [
    { title: "Platform", items: platformItems },
    { title: "Use Cases", items: useCasesItems },
    { title: "Resources", items: resourcesItems },
    { title: "Get Started", items: getStartedItems },
    { title: "Company", items: companyItems },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1 },
    }),
  };

  const simulateEscapeKeyPress = () => {
    const event = new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="p-4">
            <MenuIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="fixed inset-0 z-50">
          <DrawerHeader />
          <div className="p-4">
            <Accordion type="single" collapsible>
              {groups.map((group, index) => (
                <AccordionItem key={index} value={group.title}>
                  <AccordionTrigger>{group.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex list-none flex-col items-center p-2">
                      {group.items.map((item, itemIndex) => (
                        <motion.li
                          key={item.href}
                          className="mb-4 w-full border-b py-3 text-center last:border-b-0"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={itemIndex}
                          style={{ margin: "auto", padding: "10px 0" }}
                        >
                          <Link
                            href={item.href}
                            onClick={simulateEscapeKeyPress}
                          >
                            {item.title}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileAccordionNav;