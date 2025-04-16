"use client";

import React from "react";
import {
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
  InnerDialogClose,
  InnerDialogHeader,
  InnerDialogFooter,
  InnerDialogTitle,
  InnerDialogDescription,
} from "@/registry/default/components/dialog-stack";
import { Button } from "@/components/ui/button";

export default function DialogStackDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogHeader>
        <div className="mt-2 mb-6">
          <p className="text-muted-foreground text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
            temporibus eum tempore eligendi, provident nobis dolore, fugit, iure
            odit aperiam non similique amet est praesentium doloribus cumque
            accusamus dolores quod?
          </p>
        </div>
        <DialogFooter className="justify-between">
          <DialogClose asChild>
            <Button variant={"destructive"}>Close</Button>
          </DialogClose>
          <InnerDialog>
            <InnerDialogTrigger asChild>
              <Button variant={"outline"}>Open Inner Dialog</Button>
            </InnerDialogTrigger>
            <InnerDialogContent>
              <InnerDialogHeader>
                <InnerDialogTitle>Inner Dialog Title</InnerDialogTitle>
                <InnerDialogDescription>
                  Inner Dialog Description
                </InnerDialogDescription>
              </InnerDialogHeader>
              <div className="mt-2 mb-6">
                <p className="text-muted-foreground text-sm">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
                  temporibus eum tempore eligendi, provident nobis dolore,
                  fugit, iure odit aperiam non similique amet est praesentium
                  doloribus cumque accusamus dolores quod?
                </p>
              </div>
              <InnerDialogFooter className="justify-between">
                <InnerDialogClose asChild>
                  <Button variant={"outline"}>Back</Button>
                </InnerDialogClose>
                <Button>Submit</Button>
              </InnerDialogFooter>
            </InnerDialogContent>
          </InnerDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
