"use client";

import React from "react";

import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import { LabelForm } from "./label-form";

export function LabelDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 px-2 lg:px-3">
          Manage Labels
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Labels</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-4">
          <LabelForm />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}