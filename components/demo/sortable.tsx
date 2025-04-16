"use client";

import * as React from "react";
import { closestCorners } from "@dnd-kit/core";
import { Sortable, SortableItem } from "@/registry/default/components/sortable";

export default function SortableDemo() {
  const [data, setData] = React.useState(DATA);

  return (
    <Sortable
      orientation="mixed"
      collisionDetection={closestCorners}
      value={data}
      onValueChange={setData}
      overlay={<div className="bg-primary/10 size-full rounded-md" />}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {data.map((item) => (
          <SortableItem key={item.id} value={item.id} asTrigger asChild>
            <div className="bg-accent hover:bg-accent/80 flex aspect-video flex-col items-center justify-center rounded-md p-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          </SortableItem>
        ))}
      </div>
    </Sortable>
  );
}

const DATA = [
  {
    id: crypto.randomUUID(),
    title: "Test 1",
    description: "Test 1",
  },
  {
    id: crypto.randomUUID(),
    title: "Test 2",
    description: "Test 2",
  },
  {
    id: crypto.randomUUID(),
    title: "Test 3",
    description: "Test 3",
  },
  {
    id: crypto.randomUUID(),
    title: "Test 4",
    description: "Test 4",
  },
];
