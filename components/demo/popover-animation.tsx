"use client";

import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverForm,
  PopoverSubmitButton,
  PopoverTrigger,
} from "@/registry/default/components/popover-animation";

export default function PopoverExample() {
  return (
    <div className="space-y-4">
      <Popover>
        <PopoverTrigger>Open Popover Animation</PopoverTrigger>
        <PopoverContent className="h-[200px] w-[350px]">
          <PopoverForm>
            <Textarea
              placeholder="Add Note"
              className="h-full w-full resize-none border-none outline-none focus-visible:ring-0 focus-visible:outline-none"
              autoFocus
            />
            <PopoverFooter>
              <PopoverCloseButton />
              <PopoverSubmitButton>Submit Note</PopoverSubmitButton>
            </PopoverFooter>
          </PopoverForm>
        </PopoverContent>
      </Popover>
    </div>
  );
}
