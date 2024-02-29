"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import UploadFiles from "./file-form";

const AddFiles = () => {
  const [isOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add Files</Button>
      </DialogTrigger>
      <DialogContent>
        <UploadFiles setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddFiles;
