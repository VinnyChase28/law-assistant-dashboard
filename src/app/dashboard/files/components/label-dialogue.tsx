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

export function LabelDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 px-2 lg:px-3">
          Labels
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Labels</DialogTitle>
          <DialogDescription>
            Enter the labels you want to assign to your files. Each label should
            be unique and relevant to the file's content.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full">
          <div className="flex-1">
            <LabelForm />
          </div>
          <div className="flex-1">
            {" "}
            {/* Right column: Empty space for now */}
            {/* This is intentionally left blank for future content */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
