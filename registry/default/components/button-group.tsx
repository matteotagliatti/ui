"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonGroupVariants = cva(
  "flex max-sm:flex-col max-sm:gap-1 sm:items-center [&>*]:ring-offset-0 [&>*:focus-within]:z-10 [&>*:focus-within]:ring-1 sm:[&>*:not(:first-child)]:rounded-l-none sm:[&>*:not(:last-child)]:rounded-r-none",
  {
    variants: {
      size: {
        default: "[&>*]:h-10 [&>*]:px-4 [&>*]:py-2",
        sm: "[&>*]:h-9 [&>*]:rounded-md [&>*]:px-3",
        lg: "[&>*]:h-11 [&>*]:rounded-md [&>*]:px-8",
        icon: "[&>*]:h-10 [&>*]:w-10",
      },
      separated: {
        true: "gap-0.5 [&>*]:outline [&>*]:outline-1 [&>*]:outline-zinc-500 [&>*:focus-within]:ring-offset-2",
        false: "[&>*:focus-within]:ring-offset-1",
      },
    },
    defaultVariants: {
      separated: false,
      size: "default",
    },
  },
);

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  separated?: boolean;
}

export function ButtonGroup({
  children,
  className,
  size,
  separated = false,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={cn(buttonGroupVariants({ size, className, separated }))}
      {...props}
    >
      {children}
    </div>
  );
}
