"use client";

import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Button } from "../ui/button";
import { buttonVariants } from "../ui/button";
import { useState } from "react";

interface props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  isPending: boolean;
  onClick?: () => void;
}

export function ActionButton({
  children,
  isPending,
  variant,
  size,
  className,
  onClick,
}: props) {
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
      type="submit"
      disabled={isPending}
      variant={variant}
      size={size}
      className={cn(
        className,
        "inline-grid place-items-center [grid-template-areas:'stack']"
      )}
    >
      <span
        className={cn(
          isPending && "invisible",
          "flex items-center gap-2 [grid-area:stack]"
        )}
      >
        {children}
      </span>
      <LoaderCircle
        aria-label="Submitting"
        className={cn(
          isPending ? "visible" : "invisible",
          "size-5 animate-spin transition-opacity [grid-area:stack]"
        )}
      />
    </Button>
  );
}

/// DEMO

export default function ActionButtonDemo() {
  const [isPending, setIsPending] = useState(false);

  function handleClick() {
    setIsPending(true);
    setTimeout(() => setIsPending(false), 1500);
  }

  return (
    <div className="flex justify-center items-center">
      <ActionButton isPending={isPending} onClick={handleClick}>
        Click me
      </ActionButton>
    </div>
  );
}
