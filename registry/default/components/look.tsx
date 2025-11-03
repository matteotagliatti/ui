"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export type LookProps = ComponentProps<typeof HoverCard>;

export const Look = (props: LookProps) => {
  return <HoverCard {...props} />;
};

export type LookContentProps = ComponentProps<typeof HoverCardContent>;

export const LookContent = (props: LookContentProps) => (
  <HoverCardContent {...props} />
);

export type LookTriggerProps = ComponentProps<typeof HoverCardTrigger>;

export const LookTrigger = (props: LookTriggerProps) => (
  <HoverCardTrigger {...props} />
);

export type LookTitleProps = ComponentProps<"p">;

export const LookTitle = ({ className, ...props }: LookTitleProps) => {
  return (
    <p className={cn("truncate text-sm font-semibold", className)} {...props} />
  );
};

export type LookDescriptionProps = ComponentProps<"p">;

export const LookDescription = ({
  className,
  ...props
}: LookDescriptionProps) => {
  return (
    <p
      className={cn("text-muted-foreground line-clamp-2 text-sm", className)}
      {...props}
    />
  );
};

export type LookImageProps = ComponentProps<"img">;

export const LookImage = ({ className, alt, ...props }: LookImageProps) => (
  // biome-ignore lint/performance/noImgElement: "Kibo UI is framework agnostic"
  // eslint-disable-next-line @next/next/no-img-element
  <img
    alt={alt ?? ""}
    className={cn(
      "mb-4 aspect-[120/63] w-full rounded-md border object-cover",
      className,
    )}
    {...props}
  />
);
