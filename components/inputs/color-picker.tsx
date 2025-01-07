"use client";

import { useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Description } from "../ui/description";

interface ColorPickerProps
  extends Omit<ButtonProps, "value" | "onChange" | "onBlur"> {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  ref?: React.Ref<HTMLInputElement>;
}

export function ColorPicker({
  disabled,
  value,
  onChange,
  onBlur,
  name,
  className,
  ref,
  ...props
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);

  const parsedValue = useMemo(() => {
    return value || "#FFFFFF";
  }, [value]);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
        <Button
          {...props}
          className={cn("block", className)}
          name={name}
          onClick={() => {
            setOpen(true);
          }}
          size="icon"
          style={{
            backgroundColor: parsedValue,
          }}
          variant="outline"
        >
          <div />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <HexColorPicker color={parsedValue} onChange={onChange} />
        <Input
          maxLength={7}
          onChange={(e) => {
            onChange(e?.currentTarget?.value);
          }}
          ref={ref}
          value={parsedValue}
        />
      </PopoverContent>
    </Popover>
  );
}

export default function ColorPickerDemo() {
  const [value, setValue] = useState("#FFFFFF");

  return (
    <div className="space-y-2">
      <Label>Color Picker</Label>
      <ColorPicker value={value} onChange={setValue} />
      <Description>
        Built with{" "}
        <a
          className="underline hover:text-foreground"
          href="https://github.com/omgovich/react-colorful"
          target="_blank"
          rel="noopener nofollow"
        >
          react-colorful
        </a>
      </Description>
    </div>
  );
}
