"use client";

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverForm,
  PopoverLabel,
  PopoverTextarea,
  PopoverFooter,
  PopoverCloseButton,
  PopoverSubmitButton,
} from "@/components/ui/popover-animation";

export default function PopoverFormExample() {
  return (
    <div className="h-[200px] flex items-center justify-center">
      <PopoverRoot>
        <PopoverTrigger>Add Note</PopoverTrigger>
        <PopoverContent className="h-[200px] w-[350px]">
          <PopoverForm
            onSubmit={(note) => console.log("Note submitted:", note)}
          >
            <PopoverLabel>Add Note</PopoverLabel>
            <PopoverTextarea />
            <PopoverFooter>
              <PopoverCloseButton />
              <PopoverSubmitButton>Submit Note</PopoverSubmitButton>
            </PopoverFooter>
          </PopoverForm>
        </PopoverContent>
      </PopoverRoot>
    </div>
  );
}
