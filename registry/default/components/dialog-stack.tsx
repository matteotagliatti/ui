"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogContextValue {
  innerOpen: boolean;
  setInnerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogContext = React.createContext<DialogContextValue | undefined>(
  undefined,
);

function Dialog({ children }: { children: React.ReactNode }) {
  const [outerOpen, setOuterOpen] = React.useState(false);
  const [innerOpen, setInnerOpen] = React.useState(false);

  return (
    <DialogContext.Provider value={{ innerOpen, setInnerOpen }}>
      <DialogPrimitive.Root open={outerOpen} onOpenChange={setOuterOpen}>
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  );
}

const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

type DialogOverlayProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Overlay>>;
};

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "bg-background/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Content>>;
};

function DialogContent({ className, children, ...props }: DialogContentProps) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogContent must be used within a Dialog");

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          context.innerOpen && "translate-y-[-55%] scale-[0.97]",
          className,
        )}
        {...props}
      >
        {children}
        <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function InnerDialog({ children }: { children: React.ReactNode }) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("InnerDialog must be used within a Dialog");

  React.useEffect(() => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && context.innerOpen) {
        context.setInnerOpen(false);
        event.stopPropagation();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyDown);
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyDown);
    };
  }, [context, context.innerOpen, context.setInnerOpen]);

  return (
    <DialogPrimitive.Root
      open={context.innerOpen}
      onOpenChange={context.setInnerOpen}
    >
      {children}
    </DialogPrimitive.Root>
  );
}

const InnerDialogTrigger = DialogPrimitive.Trigger;
const InnerDialogClose = DialogPrimitive.Close;

interface InnerDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  position?: "default" | "bottom" | "top" | "left" | "right";
  draggable?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Content>>;
}

function InnerDialogContent({
  className,
  children,
  position = "default",
  draggable = false,
  ...props
}: InnerDialogContentProps) {
  const context = React.useContext(DialogContext);
  if (!context)
    throw new Error("InnerDialogContent must be used within a Dialog");

  const [isDragging, setIsDragging] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [currentY, setCurrentY] = React.useState(0);
  const [isClosingByDrag, setIsClosingByDrag] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (context.innerOpen) {
      setCurrentY(0);
      setIsClosingByDrag(false);
    }
  }, [context.innerOpen]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    setIsDragging(true);
    setStartY(e.clientY - currentY);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !draggable) return;
    const newY = e.clientY - startY;
    setCurrentY(newY > 0 ? newY : 0);
  };

  const handlePointerUp = () => {
    if (!draggable) return;
    setIsDragging(false);
    if (currentY > (contentRef.current?.offsetHeight || 0) / 2) {
      setIsClosingByDrag(true);
      context.setInnerOpen(false);
    } else {
      setCurrentY(0);
    }
  };

  return (
    <DialogPortal>
      <DialogPrimitive.Content
        ref={contentRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          transform: `translate(-50%, calc(-50% + ${currentY}px))`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
        className={cn(
          "bg-background fixed top-[50%] left-[50%] z-[60] grid w-full max-w-lg gap-4 rounded-lg border p-6 shadow-lg duration-200",
          // note: translate-x/-y Tailwind utilities are unnecessary now that transform is inline
          isClosingByDrag
            ? "data-[state=closed]:fade-out-0 data-[state=closed]:animate-none"
            : "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          position === "default" &&
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          position === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom-[10%] data-[state=open]:slide-in-from-bottom-[10%]",
          position === "top" &&
            "data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-top-full",
          position === "left" &&
            "data-[state=closed]:slide-out-to-left-full data-[state=open]:slide-in-from-left-full",
          position === "right" &&
            "data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full",
          draggable && "",
          className,
        )}
        {...props}
      >
        {children}
        <InnerDialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </InnerDialogClose>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

const InnerDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

const InnerDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);

type InnerDialogTitleProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Title>>;
};

function InnerDialogTitle({ className, ...props }: InnerDialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn(
        "text-lg leading-none font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

type InnerDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Description>>;
};

function InnerDialogDescription({
  className,
  ...props
}: InnerDialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className,
    )}
    {...props}
  />
);

type DialogTitleProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Title>>;
};

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn(
        "text-lg leading-none font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Description>>;
};

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export type { InnerDialogContentProps };
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  InnerDialog,
  InnerDialogTrigger,
  InnerDialogContent,
  InnerDialogHeader,
  InnerDialogFooter,
  InnerDialogTitle,
  InnerDialogDescription,
  InnerDialogClose,
  DialogPortal,
  DialogOverlay,
};
