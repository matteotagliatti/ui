"use client";

import { cn } from "@/lib/utils";
import FancySwitch from "./fancy-switch";
import { Label } from "../ui/label";
const options = ["Delivery", "Pickup", "Shipping"];

export default function FancySwitchHorizontal() {
  return (
    <div className="flex items-center justify-center">
      <div className="space-y-2 w-fit">
        {/* <Label>Fancy Switch Horizontal</Label> */}
        <FancySwitch
          options={options}
          data-testid="orderType"
          className="flex rounded-full bg-muted p-2"
          highlighterClassName="bg-primary rounded-full"
          aria-label="Order type"
          radioClassName={cn(
            "relative mx-2 flex h-9 cursor-pointer items-center justify-center",
            "rounded-full px-3.5 text-sm font-medium transition-colors focus:outline-none data-[checked]:text-primary-foreground",
            "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
          )}
          highlighterIncludeMargin={true}
        />
      </div>
    </div>
  );
}
