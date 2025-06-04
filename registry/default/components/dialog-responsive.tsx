"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface BaseProps {
  children: React.ReactNode;
}

interface RootDialogResponsiveProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DialogResponsiveProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const DialogResponsiveContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: false,
});

const useDialogResponsiveContext = () => {
  const context = React.useContext(DialogResponsiveContext);
  if (!context) {
    throw new Error(
      "DialogResponsive components cannot be rendered outside the DialogResponsive Context",
    );
  }
  return context;
};

const DialogResponsive = ({
  children,
  ...props
}: RootDialogResponsiveProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const DialogResponsive = isDesktop ? Dialog : Drawer;

  return (
    <DialogResponsiveContext.Provider value={{ isDesktop }}>
      <DialogResponsive {...props} {...(!isDesktop && { autoFocus: true })}>
        {children}
      </DialogResponsive>
    </DialogResponsiveContext.Provider>
  );
};

const DialogResponsiveTrigger = ({
  className,
  children,
  ...props
}: DialogResponsiveProps) => {
  const { isDesktop } = useDialogResponsiveContext();
  const DialogResponsiveTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <DialogResponsiveTrigger className={className} {...props}>
      {children}
    </DialogResponsiveTrigger>
  );
};

const DialogResponsiveClose = ({
  className,
  children,
  ...props
}: DialogResponsiveProps) => {
  const { isDesktop } = useDialogResponsiveContext();
  const DialogResponsiveClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <DialogResponsiveClose className={className} {...props}>
      {children}
    </DialogResponsiveClose>
  );
};

const DialogResponsiveContent = ({
  className,
  children,
  ...props
}: DialogResponsiveProps) => {
  const { isDesktop } = useDialogResponsiveContext();
  const DialogResponsiveContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <DialogResponsiveContent className={className} {...props}>
      {children}
    </DialogResponsiveContent>
  );
};

const DialogResponsiveDescription = ({
  className,
  children,
  ...props
}: DialogResponsiveProps) => {
  const { isDesktop } = useDialogResponsiveContext();
  const DialogResponsiveDescription = isDesktop
    ? DialogDescription
    : DrawerDescription;

  return (
    <DialogResponsiveDescription className={className} {...props}>
      {children}
    </DialogResponsiveDescription>
  );
};

const DialogResponsiveHeader = ({
  className,
  children,
  ...props
}: DialogResponsiveProps) => {
  const { isDesktop } = useDialogResponsiveContext();
  const DialogResponsiveHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <DialogResponsiveHeader className={className} {...props}>
      {children}
    </DialogResponsiveHeader>
  );
};

const DialogResponsiveTitle = ({
  className,
  children,
  ...props
}: DialogResponsiveProps) => {
  const { isDesktop } = useDialogResponsiveContext();
  const DialogResponsiveTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <DialogResponsiveTitle className={className} {...props}>
      {children}
    </DialogResponsiveTitle>
  );
};

const DialogResponsiveBody = ({
  className,
  children,
  ...props
}: DialogResponsiveProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const DialogResponsiveFooter = ({
  className,
  children,
  ...props
}: DialogResponsiveProps) => {
  const { isDesktop } = useDialogResponsiveContext();
  const DialogResponsiveFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <DialogResponsiveFooter className={className} {...props}>
      {children}
    </DialogResponsiveFooter>
  );
};

export {
  DialogResponsive,
  DialogResponsiveTrigger,
  DialogResponsiveClose,
  DialogResponsiveContent,
  DialogResponsiveDescription,
  DialogResponsiveHeader,
  DialogResponsiveTitle,
  DialogResponsiveBody,
  DialogResponsiveFooter,
};
