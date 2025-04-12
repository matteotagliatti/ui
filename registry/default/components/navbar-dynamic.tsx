"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useClickOutside from "@/registry/default/hooks/use-click-outside";
import { ArrowLeft, Search, User } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { useRef, useState } from "react";

interface Props {
  className?: string;
  initialWidth?: string;
  openWidth?: string;
}

export function NavbarDynamic({
  className,
  initialWidth = "100px",
  openWidth = "300px",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useClickOutside(containerRef, () => {
    setOpen(false);
  });

  return (
    <MotionConfig
      transition={{
        type: "spring",
        bounce: 0.1,
        duration: 0.2,
      }}
    >
      <div className={className} ref={containerRef}>
        <div className="bg-muted/50 border-border/50 h-full w-full rounded-xl border backdrop-blur-sm">
          <motion.div
            animate={{
              width: open ? openWidth : initialWidth,
            }}
            initial={false}
          >
            <div className="overflow-hidden p-2">
              {!open ? (
                <div className="flex">
                  <Button disabled variant={"ghost"}>
                    <User className="h-5 w-5" />
                  </Button>
                  <Button
                    className="pl-2"
                    variant={"ghost"}
                    onClick={() => setOpen(true)}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="flex">
                  <Button variant={"ghost"} onClick={() => setOpen(false)}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Input
                    className="h-9 w-full"
                    autoFocus
                    placeholder="Search"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
}
