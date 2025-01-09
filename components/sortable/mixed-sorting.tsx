"use client";

import * as React from "react";
import { closestCorners } from "@dnd-kit/core";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sortable, SortableItem } from "@/components/ui/sortable";

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
  {
    id: crypto.randomUUID(),
    title: "Test 5",
    description: "Test 5",
  },
  {
    id: crypto.randomUUID(),
    title: "Test 6",
    description: "Test 6",
  },
  {
    id: crypto.randomUUID(),
    title: "Test 7",
    description: "Test 7",
  },
  {
    id: crypto.randomUUID(),
    title: "Test 8",
    description: "Test 8",
  },
];

export default function MixedSorting() {
  const [data, setData] = React.useState(DATA);

  return (
    <Sortable
      orientation="mixed"
      collisionDetection={closestCorners}
      value={data}
      onValueChange={setData}
      overlay={<div className="size-full rounded-md bg-primary/10" />}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {data.map((item) => (
          <SortableItem key={item.id} value={item.id} asTrigger asChild>
            <Card className="flex aspect-video items-center justify-center rounded-md bg-accent hover:bg-accent/80">
              <CardHeader className="items-center">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </SortableItem>
        ))}
      </div>
    </Sortable>
  );
}
