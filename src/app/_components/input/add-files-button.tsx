"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DocumentUploadForm } from "./file-uploader-form";

const AddFiles = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Files</Button>
      </DialogTrigger>
      <DialogContent>
        <DocumentUploadForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddFiles;
