import React from "react";

import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@components/ui/dialog";

import { LabelForm } from "./label-form"; // Import the LabelForm component

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
            be unique and relevant to the file&apos;s content.
          </DialogDescription>
        </DialogHeader>

        <LabelForm />
      </DialogContent>
    </Dialog>
  );
}
