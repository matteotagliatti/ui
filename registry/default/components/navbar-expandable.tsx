"use client";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/const";
import { cn } from "@/lib/utils";
import useClickOutside from "@/registry/default/hooks/use-click-outside";
import useMeasure from "@/registry/default/hooks/use-measure";
import { Folder, MessageCircle, User, WalletCards } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
}

export function ToolbarExpandable({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [contentRef, { height: heightContent }] = useMeasure();
  const [menuRef, { width: widthContainer }] = useMeasure();
  const [active, setActive] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(0);

  useClickOutside(ref, () => {
    setIsOpen(false);
    setActive(null);
  });

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return;

    setMaxWidth(widthContainer);
  }, [widthContainer, maxWidth]);

  return (
    <MotionConfig
      transition={{
        type: "spring",
        bounce: 0.1,
        duration: 0.25,
      }}
    >
      <div className={className} ref={ref}>
        <div className="h-full w-full rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0 }}
                  animate={{ height: heightContent || 0 }}
                  exit={{ height: 0 }}
                  style={{
                    width: maxWidth,
                  }}
                >
                  <div ref={contentRef} className="p-2">
                    {ITEMS.map((item) => {
                      const isSelected = active === item.id;

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <div
                            className={cn(
                              "px-2 pt-2 text-sm",
                              isSelected ? "block" : "hidden"
                            )}
                          >
                            {item.content}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div className="flex space-x-2 p-2" ref={menuRef}>
            {ITEMS.map((item) => (
              <Button
                key={item.id}
                variant="link"
                size="icon"
                aria-label={item.label}
                className={cn(
                  "active:scale-[0.98]"
                  /* active === item.id &&
                    "bg-accent text-accent-foreground dark:hover:bg-accent/50" */
                )}
                onClick={() => {
                  if (!isOpen) setIsOpen(true);
                  if (active === item.id) {
                    setIsOpen(false);
                    setActive(null);
                    return;
                  }

                  setActive(item.id);
                }}
              >
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

const ITEMS = [
  {
    id: 1,
    label: "User",
    title: <User className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-1 text-primary">
          <span>{site.author}</span>
        </div>
        <Button size="sm">Edit Profile</Button>
      </div>
    ),
  },
  {
    id: 2,
    label: "Messages",
    title: <MessageCircle className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="text-primary">You have 3 new messages.</div>
        <Button size="sm">View more</Button>
      </div>
    ),
  },
  {
    id: 3,
    label: "Documents",
    title: <Folder className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col text-primary">
          <div className="space-y-1">
            <div>document.pdf</div>
            <div>document.docx</div>
          </div>
        </div>
        <Button size="sm">Manage documents</Button>
      </div>
    ),
  },
  {
    id: 4,
    label: "Wallet",
    title: <WalletCards className="h-5 w-5" />,
    content: (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col text-primary">
          <span>Current Balance</span>
          <span>€ 10.00</span>
        </div>
        <Button size="sm">View Transactions</Button>
      </div>
    ),
  },
];
