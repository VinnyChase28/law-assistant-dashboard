"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import UploadFiles from "./file-form";
import { PlusCircle } from "lucide-react";

const AddFiles = () => {
  const [isOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="pl-3">
      <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="h-4 w-4" />
            {/* <span className="ml-2">Add files</span> */}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <p>Add Files</p>
          <UploadFiles setIsDialogOpen={setIsDialogOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFiles;
