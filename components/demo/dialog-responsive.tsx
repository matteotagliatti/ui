import {
  DialogResponsive,
  DialogResponsiveTrigger,
  DialogResponsiveContent,
  DialogResponsiveHeader,
  DialogResponsiveTitle,
  DialogResponsiveDescription,
  DialogResponsiveBody,
  DialogResponsiveFooter,
  DialogResponsiveClose,
} from "@/registry/default/components/dialog-responsive";
import { Button } from "@/components/ui/button";

export default function DialogResponsiveDemo() {
  return (
    <DialogResponsive>
      <DialogResponsiveTrigger asChild>
        <Button>Open responsive dialog</Button>
      </DialogResponsiveTrigger>
      <DialogResponsiveContent>
        <DialogResponsiveHeader>
          <DialogResponsiveTitle>DialogResponsive</DialogResponsiveTitle>
          <DialogResponsiveDescription>
            A responsive modal component for shadcn/ui.
          </DialogResponsiveDescription>
        </DialogResponsiveHeader>
        <DialogResponsiveBody>
          This component is built using shadcn/ui&apos;s dialog and drawer
          component, which is built on top of Vaul.
        </DialogResponsiveBody>
        <DialogResponsiveFooter>
          <DialogResponsiveClose asChild>
            <Button>Close</Button>
          </DialogResponsiveClose>
        </DialogResponsiveFooter>
      </DialogResponsiveContent>
    </DialogResponsive>
  );
}
