import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function InputFile({ onFilesChange }) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input
        id="picture"
        type="file"
        multiple
        onChange={(e) => onFilesChange(e.target.files)}
      />
    </div>
  );
}
