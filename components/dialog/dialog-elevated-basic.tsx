"use client";

import { AnimatePresence, type AnimationProps, motion } from "framer-motion";
import React from "react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogPortal,
} from "@/components/ui/dialog-elevated";
import { DialogOverlay } from "@/components/ui/dialog-elevated";
import { Button } from "@/components/ui/button";

export const DialogElevatedBasic = () => {
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
  };

  return (
    <div className="flex items-center justify-center">
      <DialogRoot open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogPortal forceMount>
          <AnimatePresence>
            {open && (
              <DialogOverlay className="fixed top-0 left-0 h-full w-full">
                <motion.div
                  className="fixed inset-0 bg-black-a10"
                  {...variants.overlay}
                />
              </DialogOverlay>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {open && (
              <DialogContent className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2">
                <motion.div
                  className="flex max-h-[85vh] w-[90vw] flex-col overflow-hidden rounded-xl border border-border bg-background sm:w-[384px]"
                  {...variants.content}
                >
                  <DialogTitle className="px-6 pt-5 font-semibold text-foreground text-large">
                    Change Username
                  </DialogTitle>
                  <DialogDescription className="px-6 py-1 text-muted-foreground">
                    Make changes to your username here.
                  </DialogDescription>
                  <fieldset className="mb-[15px] flex items-center gap-4 px-6 py-5">
                    <input
                      id="name"
                      placeholder="@raphaelsalaja"
                      className="inline-flex h-[32px] w-full flex-1 items-center justify-center rounded-lg border border-input bg-background px-2.5 text-[15px] text-foreground leading-none transition-all placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                    />
                  </fieldset>
                  <div className="flex justify-between gap-4 border-t border-border bg-muted px-6 py-4">
                    <DialogClose className="text-muted-foreground h-[32px] max-w-fit rounded-lg bg-secondary px-3 transition-all ease-in-out hover:bg-secondary/80">
                      Cancel
                    </DialogClose>
                    <DialogClose className="text-primary h-[32px] max-w-fit rounded-lg bg-primary/10 px-3 transition-all ease-in-out hover:bg-primary/20">
                      Save Changes
                    </DialogClose>
                  </div>
                </motion.div>
              </DialogContent>
            )}
          </AnimatePresence>
        </DialogPortal>
      </DialogRoot>
    </div>
  );
};

export default DialogElevatedBasic;
