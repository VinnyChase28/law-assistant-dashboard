"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import UploadFiles from "./file-form";
import { PlusIcon } from "lucide-react";

const AddFiles = () => {
  const [isOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="pl-3">
      <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="h-3 w-3" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <UploadFiles setIsDialogOpen={setIsDialogOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFiles;
