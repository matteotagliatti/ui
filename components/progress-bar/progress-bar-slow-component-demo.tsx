"use client";

import { useProgressBarTransition } from "@/components/progress-bar/progress-bar";
import { startTransition, useState } from "react";
import { Input } from "../ui/input";

export default function ProgressBarDemo() {
  const { stop, start } = useProgressBarTransition();
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);

  return (
    <div className="flex flex-col gap-4">
      <p className="">
        Count:
        <span className="bold"> {count}</span>
      </p>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium p-2 bg-gray-100 text-gray-800"
        onClick={() => {
          start();
          startTransition(async () => {
            await new Promise((resolve) => setTimeout(resolve, delay)); // Introduces artificial slowdown
            setCount((count) => count + 1);
            stop();
          });
        }}
      >
        Trigger slow transition ({delay / 1000}
        s)
      </button>
      <p className="flex items-center mb-4 gap-2">
        Delay(ms):
        <Input
          type="number"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
        />
      </p>
    </div>
  );
}
