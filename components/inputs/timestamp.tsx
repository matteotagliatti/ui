"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Description } from "@/components/ui/description";
import { withMask } from "use-mask-input";

export default function Timestamp() {
  return (
    <div className="space-y-2">
      <Label htmlFor="timestamp">Timestamp</Label>
      <Input
        id="timestamp"
        placeholder="00:00:00"
        type="text"
        ref={withMask("99:99:99", {
          placeholder: "-",
          showMaskOnHover: false,
        })}
      />
      <Description>
        Built with{" "}
        <a
          className="underline hover:text-foreground"
          href="https://github.com/eduardoborges/use-mask-input"
          target="_blank"
          rel="noopener nofollow"
        >
          use-mask-input
        </a>
      </Description>
    </div>
  );
}
