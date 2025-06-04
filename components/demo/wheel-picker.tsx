"use client";

import {
  type WheelPickerOption,
  WheelPicker,
  WheelPickerWrapper,
} from "@/registry/default/components/wheel-picker";
import { cn } from "@/lib/utils";
import { useState } from "react";

const createArray = (length: number, add = 0): WheelPickerOption[] =>
  Array.from({ length }, (_, i) => {
    const value = i + add;
    return {
      label: value.toString().padStart(2, "0"),
      value: value.toString(),
    };
  });

const hourOptions = createArray(12, 1);
const minuteOptions = createArray(60);
const meridiemOptions: WheelPickerOption[] = [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

const options: WheelPickerOption[] = [
  {
    label: "Banana",
    value: "banana",
  },
  {
    label: "Apple",
    value: "apple",
  },
  {
    label: "Orange",
    value: "orange",
  },
  {
    label: "Pineapple",
    value: "pineapple",
  },
  {
    label: "Strawberry",
    value: "strawberry",
  },
  {
    label: "Watermelon",
    value: "watermelon",
  },
  {
    label: "Mango",
    value: "mango",
  },
  {
    label: "Kiwi",
    value: "kiwi",
  },
];

export default function WheelPickerComponentDemo() {
  const [value, setValue] = useState(options[0].value);
  return (
    <div className="w-56 space-y-4">
      <WheelPickerWrapperDemo>
        <WheelPickerDemo options={hourOptions} infinite />
        <WheelPickerDemo options={minuteOptions} infinite />
        <WheelPickerDemo options={meridiemOptions} />
      </WheelPickerWrapperDemo>

      <WheelPickerWrapperDemo>
        <WheelPickerDemo
          options={options}
          value={value}
          onValueChange={setValue}
        />
      </WheelPickerWrapperDemo>
    </div>
  );
}

function WheelPickerWrapperDemo({
  className,
  ...props
}: React.ComponentProps<typeof WheelPickerWrapper>) {
  return (
    <WheelPickerWrapper
      className={cn(
        "w-56 rounded-lg bg-white px-1 shadow-sm ring ring-black/5 dark:bg-zinc-900 dark:ring-white/15",
        "*:data-rwp:first:*:data-rwp-highlight-wrapper:rounded-s-md",
        "*:data-rwp:last:*:data-rwp-highlight-wrapper:rounded-e-md",
        className,
      )}
      {...props}
    />
  );
}

function WheelPickerDemo({
  classNames,
  ...props
}: React.ComponentProps<typeof WheelPicker>) {
  return (
    <WheelPicker
      classNames={{
        optionItem: "text-zinc-400 dark:text-zinc-500",
        highlightWrapper:
          "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50",
        ...classNames,
      }}
      {...props}
    />
  );
}
