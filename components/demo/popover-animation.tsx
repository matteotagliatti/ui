"use client";

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverForm,
  PopoverFooter,
  PopoverCloseButton,
  PopoverSubmitButton,
  PopoverHeader,
  PopoverBody,
  PopoverButton,
} from "@/registry/default/components/popover-animation";
import { Settings, Share, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function PopoverFormExample() {
  return (
    <div className="space-y-4">
      {/* Note */}
      <PopoverRoot>
        <PopoverTrigger>Add Note</PopoverTrigger>
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
      </PopoverRoot>
      {/* Options */}
      <PopoverRoot>
        <PopoverTrigger variant="outline">More options</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Options</PopoverHeader>
          <PopoverBody className="p-2">
            <PopoverButton>
              <Settings className="h-4 w-4" />
              Settings
            </PopoverButton>
            <PopoverButton>
              <Share className="h-4 w-4" />
              Share
            </PopoverButton>
            <PopoverButton>
              <MessageSquare className="h-4 w-4" />
              Send Message
            </PopoverButton>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </div>
  );
}
