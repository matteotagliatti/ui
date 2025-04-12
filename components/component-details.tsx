import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MyRegistryItem } from "@/lib/types";
import { Code } from "lucide-react";

interface Props {
  component: MyRegistryItem;
  children: React.ReactNode;
}

export function ComponentDetails({ component, children }: Props) {
  return (
    <Dialog>
      <TooltipProvider>
        <div className="absolute top-2 right-2 flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground/80 hover:text-foreground hover:bg-transparent disabled:opacity-100 lg:opacity-0 lg:group-focus-within/item:opacity-100 lg:group-hover/item:opacity-100"
                  >
                    <Code size={16} strokeWidth={2} aria-hidden={true} />
                  </Button>
                </DialogTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs">
              View code
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-left">{component.title}</DialogTitle>
          <DialogDescription className="hidden">
            {component.description}
          </DialogDescription>
        </DialogHeader>
        <div className="min-w-0 space-y-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
