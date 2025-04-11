"use client";

import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading: boolean;
}

export function ButtonLoading({
  type = "button",
  isLoading,
  className,
  onClick,
  ...props
}: Props) {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={isLoading}
      className={cn(
        className,
        "inline-grid place-items-center [grid-template-areas:'stack']"
      )}
      {...props}
    >
      <span
        className={cn(
          isLoading && "invisible",
          "flex items-center gap-2 [grid-area:stack]"
        )}
      >
        {props.children}
      </span>
      <LoaderCircle
        aria-label="loading"
        className={cn(
          isLoading ? "visible" : "invisible",
          "size-4 animate-spin transition-opacity [grid-area:stack]"
        )}
      />
    </Button>
  );
}
