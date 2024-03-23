import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LabelForm } from "./label-form"; // Import the LabelForm component
import { Button } from "src/app/_components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";


export function LabelDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 px-2 lg:px-3">
          New Label
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Labels</DialogTitle>
          <DialogDescription>
            Enter the labels you want to assign to your files. Each label should
            be unique and relevant to the file's content.
          </DialogDescription>
        </DialogHeader>
        <LabelForm /> {/* Embed the LabelForm component here */}
      </DialogContent>
    </Dialog>
  );
}
