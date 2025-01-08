"use client";

import { motion, Spring, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { RefObject } from "react";

interface ScrollProgressProps {
  className?: string;
  springOptions?: Spring;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const DEFAULT_SPRING_OPTIONS: Spring = {
  type: "spring",
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
};

export function ScrollProgress({
  className,
  springOptions,
  containerRef,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: containerRef?.current !== null,
  });

  const scaleX = useSpring(scrollYProgress, {
    ...(springOptions ?? DEFAULT_SPRING_OPTIONS),
  });

  return (
    <motion.div
      className={cn("inset-x-0 top-0 h-1 origin-left", className)}
      style={{
        scaleX,
      }}
    />
  );
}
