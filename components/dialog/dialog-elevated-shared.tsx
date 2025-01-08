"use client";
import { AnimatePresence, type AnimationProps, motion } from "framer-motion";
import React from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-elevated";
import { DialogSharedItem } from "../ui/dialog-elevated";

export const DialogElevatedShared = () => {
  const [open, setOpen] = React.useState(false);

  const variants: { [key: string]: AnimationProps } = {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
    },
    content: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 },
      transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
    },
    button: {
      transition: { layout: { ease: [0.19, 1, 0.22, 1], duration: 0.6 } },
    },
  };

  return (
    <div className="flex items-center justify-center">
      <DialogRoot open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <DialogSharedItem
            layout
            layoutId="action"
            className="pointer-events-auto flex h-[32px] items-center rounded-lg border border-border bg-background px-3"
            {...variants.button}
          >
            Open Shared
          </DialogSharedItem>
        </DialogTrigger>

        <AnimatePresence>
          {open && (
            <DialogPortal forceMount>
              <DialogOverlay className="fixed top-0 left-0 h-full w-full">
                <motion.div
                  className="fixed inset-0 bg-black/10"
                  {...variants.overlay}
                />
              </DialogOverlay>
              <DialogContent className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[450px]">
                <motion.div
                  className="w-full flex-col overflow-hidden rounded-xl border border-border bg-background sm:w-[384px]"
                  {...variants.content}
                >
                  <DialogTitle className="px-6 pt-5 font-semibold text-foreground text-large">
                    Change Username
                  </DialogTitle>
                  <DialogDescription className="px-6 py-1 text-muted-foreground">
                    Make changes to your username here.
                  </DialogDescription>
                  <fieldset className="mb-[15px] flex items-center gap-4 px-6 py-4">
                    <input
                      id="name"
                      placeholder="@raphaelsalaja"
                      className="inline-flex h-[32px] w-full flex-1 items-center justify-center rounded-lg border border-input bg-back\ound px-2.5 text-[15px] text-foreground leading-none transition-all placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                    />
                  </fieldset>
                  <div className="flex justify-between gap-4 border-t border-border bg-muted px-6 py-5">
                    <DialogClose className="text-muted-foreground h-[32px] max-w-fit rounded-lg bg-secondary px-3 transition-all ease-in-out hover:bg-secondary/80">
                      Cancel
                    </DialogClose>
                    <motion.div layout layoutId="action" {...variants.button}>
                      <DialogClose className="flex h-[32px] items-center rounded-lg border border-border bg-background px-3">
                        Save Changes
                      </DialogClose>
                    </motion.div>
                  </div>
                </motion.div>
              </DialogContent>
            </DialogPortal>
          )}
        </AnimatePresence>
      </DialogRoot>
    </div>
  );
};

export default DialogElevatedShared;
