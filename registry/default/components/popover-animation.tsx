"use client";

import * as React from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  createContext,
  useContext,
  useId,
  useRef,
  useEffect,
  type ReactNode,
  useState,
  FormEvent,
} from "react";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

interface PopoverContextType {
  isOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  uniqueId: string;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

function usePopover() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a PopoverProvider");
  }
  return context;
}

function usePopoverLogic() {
  const uniqueId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const openPopover = () => setIsOpen(true);
  const closePopover = () => {
    setIsOpen(false);
  };

  return { isOpen, openPopover, closePopover, uniqueId };
}

interface PopoverRootProps {
  children: ReactNode;
  className?: string;
}

function PopoverRoot({ children, className }: PopoverRootProps) {
  const popoverLogic = usePopoverLogic();

  return (
    <PopoverContext.Provider value={popoverLogic}>
      <MotionConfig transition={TRANSITION}>
        <div
          className={cn(
            "relative isolate flex items-center justify-center",
            className,
          )}
        >
          {children}
        </div>
      </MotionConfig>
    </PopoverContext.Provider>
  );
}

interface PopoverTriggerProps {
  children: ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

function PopoverTrigger({
  children,
  className,
  variant = "outline",
}: PopoverTriggerProps) {
  const { openPopover, uniqueId } = usePopover();

  return (
    <motion.div key="button" layoutId={`popover-${uniqueId}`}>
      <Button variant={variant} className={className} onClick={openPopover}>
        <motion.span layoutId={`popover-label-${uniqueId}`} className="text-sm">
          {children}
        </motion.span>
      </Button>
    </motion.div>
  );
}

interface PopoverContentProps {
  children: ReactNode;
  className?: string;
}

function PopoverContent({ children, className }: PopoverContentProps) {
  const { isOpen, closePopover, uniqueId } = usePopover();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePopover]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopover();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closePopover]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={contentRef}
          layoutId={`popover-${uniqueId}`}
          className={cn(
            "bg-popover text-popover-foreground absolute z-50 min-w-[200px] overflow-hidden rounded-md border shadow-md outline-none",
            className,
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface PopoverFormProps {
  children: ReactNode;
  onSubmit?: () => void;
  className?: string;
}

function PopoverForm({ children, onSubmit, className }: PopoverFormProps) {
  const { closePopover } = usePopover();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.();
    closePopover();
  };

  return (
    <form
      className={cn("flex h-full flex-col", className)}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

interface PopoverFooterProps {
  children: ReactNode;
  className?: string;
}

function PopoverFooter({ children, className }: PopoverFooterProps) {
  return (
    <div
      key="close"
      className={cn(
        "flex items-center justify-between border-t px-4 py-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface PopoverCloseButtonProps {
  className?: string;
}

function PopoverCloseButton({ className }: PopoverCloseButtonProps) {
  const { closePopover } = usePopover();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={closePopover}
      aria-label="Close popover"
    >
      <X className="h-4 w-4" />
    </Button>
  );
}

interface PopoverSubmitButtonProps {
  children?: ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

function PopoverSubmitButton({
  children = "Submit",
  className,
  variant = "default",
}: PopoverSubmitButtonProps) {
  return (
    <Button type="submit" variant={variant} size="sm" className={className}>
      {children}
    </Button>
  );
}

interface PopoverHeaderProps {
  children: ReactNode;
  className?: string;
}

function PopoverHeader({ children, className }: PopoverHeaderProps) {
  return (
    <div
      className={cn(
        "text-foreground/90 border-b px-4 py-2.5 font-medium",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface PopoverBodyProps {
  children: ReactNode;
  className?: string;
}

function PopoverBody({ children, className }: PopoverBodyProps) {
  return <div className={cn("p-4", className)}>{children}</div>;
}

interface PopoverButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

function PopoverButton({ children, onClick, className }: PopoverButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 px-4 py-2 font-normal",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverForm,
  PopoverFooter,
  PopoverCloseButton,
  PopoverSubmitButton,
  PopoverHeader,
  PopoverBody,
  PopoverButton,
};
