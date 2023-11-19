"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";

import InputFile from "./file-form";

const AddFiles = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Files</Button>
      </DialogTrigger>
      <DialogContent>
        <InputFile />
      </DialogContent>
    </Dialog>
  );
};

export default AddFiles;
