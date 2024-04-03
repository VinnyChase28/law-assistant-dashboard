"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxWithTextProps {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function CheckboxWithText({
  label,
  description,
  checked,
  onCheckedChange,
}: CheckboxWithTextProps) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="h-4 w-4"
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
