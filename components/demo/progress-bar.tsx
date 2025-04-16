"use client";

import { Link } from "@/registry/default/components/progress-bar";
import { useProgressBarTransition } from "@/registry/default/components/progress-bar";
import { startTransition } from "react";

export default function ProgressBarDemo() {
  const { start, stop } = useProgressBarTransition();
  const delay = 2000;

  return (
    <div className="flex flex-col gap-4">
      <Link href="/motion" className="underline">
        Go to Other Page
      </Link>
      <button
        className="inline-flex items-center justify-center rounded-md bg-gray-100 p-2 text-sm font-medium whitespace-nowrap text-gray-800"
        onClick={() => {
          start();
          startTransition(async () => {
            await new Promise((resolve) => setTimeout(resolve, delay)); // Introduces artificial slowdown
            stop();
          });
        }}
      >
        Trigger slow transition ({delay / 1000}
        s)
      </button>
    </div>
  );
}
