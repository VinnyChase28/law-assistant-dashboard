"use client";

import React, { useState } from "react";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import { PanelBottomClose } from "lucide-react";
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
  DrawerClose,
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
  const [isOpen, setIsOpen] = useState(false);

  const groups = [
    { title: "Platform", items: platformItems },
    { title: "Use Cases", items: useCasesItems },
    { title: "Resources", items: resourcesItems },
    { title: "Get Started", items: getStartedItems },
    { title: "Company", items: companyItems },
  ];

  return (
    <>
      <Drawer>
        <Drawer>
          <DrawerTrigger asChild>
            <Button onClick={() => setIsOpen(!isOpen)} className="p-4">
              <HamburgerMenuIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="fixed inset-0 z-50">
            <DrawerHeader>
              <DrawerClose asChild>
                <Button className="p-2" onClick={() => setIsOpen(false)}>
                  <PanelBottomClose />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <div className="p-4">
              <Accordion type="single" collapsible>
                {groups.map((group, index) => (
                  <AccordionItem key={index} value={group.title}>
                    <AccordionTrigger>{group.title}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-none p-2">
                        {group.items.map((item) => (
                          <li key={item.href} className="mb-2">
                            <Link href={item.href}>{item.title}</Link>
                            <Separator />
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </DrawerContent>
        </Drawer>
      </Drawer>
    </>
  );
};

export default MobileAccordionNav;