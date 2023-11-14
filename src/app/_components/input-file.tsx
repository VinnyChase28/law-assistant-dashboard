import React from "react";
import { Input } from "@/components/ui/input";

interface InputFileProps {
  onFilesChange: (files: FileList) => void;
}

export function InputFile({ onFilesChange }: InputFileProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input
        id="picture"
        type="file"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            onFilesChange(e.target.files);
          }
        }}
      />
    </div>
  );
}
