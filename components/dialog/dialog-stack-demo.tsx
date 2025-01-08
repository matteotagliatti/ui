import { Button } from "@/components/ui/button";
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackDescription,
  DialogStackFooter,
  DialogStackHeader,
  DialogStackNext,
  DialogStackOverlay,
  DialogStackPrevious,
  DialogStackTitle,
  DialogStackTrigger,
} from "@/components/ui/dialog-stack";

export default function DialogStackDemo() {
  return (
    <div className="flex items-center justify-center">
      <DialogStack clickable>
        <DialogStackTrigger asChild>
          <Button variant="outline">Dialog Stack</Button>
        </DialogStackTrigger>
        <DialogStackOverlay />

        {/* 1 */}
        <DialogStackBody>
          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>I'm the first dialog</DialogStackTitle>
              <DialogStackDescription>
                With a fancy description
              </DialogStackDescription>
            </DialogStackHeader>
            <DialogStackFooter className="justify-end">
              <DialogStackNext asChild>
                <Button variant="outline">Next</Button>
              </DialogStackNext>
            </DialogStackFooter>
          </DialogStackContent>

          {/* 2 */}
          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>I'm the second dialog</DialogStackTitle>
              <DialogStackDescription>
                With a fancy description
              </DialogStackDescription>
            </DialogStackHeader>
            <DialogStackFooter className="justify-between">
              <DialogStackPrevious asChild>
                <Button variant="outline">Previous</Button>
              </DialogStackPrevious>
              <DialogStackNext asChild>
                <Button variant="outline">Next</Button>
              </DialogStackNext>
            </DialogStackFooter>
          </DialogStackContent>

          {/* 3 */}
          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>I'm the third dialog</DialogStackTitle>
              <DialogStackDescription>
                With a fancy description
              </DialogStackDescription>
            </DialogStackHeader>
            <DialogStackFooter className="justify-between">
              <DialogStackPrevious asChild>
                <Button variant="outline">Previous</Button>
              </DialogStackPrevious>
              <DialogStackNext asChild>
                <Button variant="outline">Next</Button>
              </DialogStackNext>
            </DialogStackFooter>
          </DialogStackContent>

          {/* 4 */}
          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>I'm the fourth dialog</DialogStackTitle>
              <DialogStackDescription>
                With a fancy description
              </DialogStackDescription>
            </DialogStackHeader>
            <DialogStackFooter className="justify-start">
              <DialogStackPrevious asChild>
                <Button variant="outline">Previous</Button>
              </DialogStackPrevious>
            </DialogStackFooter>
          </DialogStackContent>
        </DialogStackBody>
      </DialogStack>
    </div>
  );
}
