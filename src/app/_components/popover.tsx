import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
export default function PopOverButton() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>New folder</Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[150px] text-center">
        Coming Soon!
      </PopoverContent>
    </Popover>
  );
}
