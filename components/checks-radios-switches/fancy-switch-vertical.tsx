"use client";

import { cn } from "@/lib/utils";
import FancySwitch from "./fancy-switch";
import { Label } from "../ui/label";

const options = [
  { label: "Publish", value: 1 },
  { label: "Draft", value: 0 },
];

export default function FancySwitchVertical() {
  return (
    <div className="space-y-2 w-8/12">
      <Label>Fancy Switch Vertical</Label>
      <FancySwitch
        options={options}
        className="rounded-xl bg-muted p-2"
        highlighterClassName="bg-primary rounded-xl"
        radioClassName={cn(
          "relative flex h-9 cursor-pointer items-center justify-center",
          "rounded-full px-3.5 text-sm font-medium transition-colors data-[checked]:text-primary-foreground",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
        )}
      />
    </div>
  );
}
