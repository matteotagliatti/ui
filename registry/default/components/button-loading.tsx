"use client";

import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  isLoading: boolean;
  onClick?: () => void;
}

export default function ButtonLoading({
  type = "button",
  children,
  isLoading,
  variant,
  size,
  className,
  onClick,
}: Props) {
  return (
    <Button
      onClick={
        onClick
          ? (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              onClick();
            }
          : undefined
      }
      type={type}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={cn(
        className,
        "inline-grid place-items-center [grid-template-areas:'stack']"
      )}
    >
      <span
        className={cn(
          isLoading && "invisible",
          "flex items-center gap-2 [grid-area:stack]"
        )}
      >
        {children}
      </span>
      <LoaderCircle
        aria-label="loading"
        className={cn(
          isLoading ? "visible" : "invisible",
          "size-5 animate-spin transition-opacity [grid-area:stack]"
        )}
      />
    </Button>
  );
}
