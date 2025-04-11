"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/registry/default/components/button-group";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <ArrowLeft className="size-4" />
        Previous
      </Button>
      <Button variant="outline">
        Next
        <ArrowRight className="size-4" />
      </Button>
    </ButtonGroup>
  );
}
