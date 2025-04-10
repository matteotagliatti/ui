"use client";

import { ButtonLoading } from "@/registry/default/components/button-loading";
import { useState } from "react";

export default function ButtonLoadingDemo() {
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <ButtonLoading isLoading={isLoading} onClick={handleClick}>
      Button
    </ButtonLoading>
  );
}
