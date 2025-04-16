"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  KanbanBoard,
  KanbanColumn,
  KanbanColumnHandle,
  KanbanItem,
  KanbanOverlay,
  Kanban,
} from "@/registry/default/components/kanban";
import { GripVertical } from "lucide-react";
import * as React from "react";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  priority: "low" | "medium" | "high";
  assignee?: string;
  dueDate?: string;
}

export default function KanbanDemo() {
  const [columns, setColumns] = useState<Record<string, Task[]>>(data);

  return (
    <Kanban
      value={columns}
      onValueChange={setColumns}
      getItemValue={(item) => item.id}
    >
      <KanbanBoard className="grid auto-rows-fr sm:grid-cols-3">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <KanbanColumn key={columnValue} value={columnValue}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {COLUMN_TITLES[columnValue]}
                </span>
                <Badge
                  variant="secondary"
                  className="pointer-events-none rounded-sm"
                >
                  {tasks.length}
                </Badge>
              </div>
              <KanbanColumnHandle asChild>
                <Button variant="ghost" size="icon">
                  <GripVertical className="h-4 w-4" />
                </Button>
              </KanbanColumnHandle>
            </div>
            <div className="flex flex-col gap-2 p-0.5">
              {tasks.map((task) => (
                <KanbanItem key={task.id} value={task.id} asHandle asChild>
                  <div className="bg-accent hover:bg-accent/80 rounded-md border p-3 shadow-xs">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="line-clamp-1 text-sm font-medium">
                          {task.title}
                        </span>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize"
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground flex items-center justify-between text-xs">
                        {task.assignee && (
                          <div className="flex items-center gap-1">
                            <div className="bg-primary/20 size-2 rounded-full" />
                            <span className="line-clamp-1">
                              {task.assignee}
                            </span>
                          </div>
                        )}
                        {task.dueDate && (
                          <p className="text-[10px]">{task.dueDate}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </KanbanItem>
              ))}
            </div>
          </KanbanColumn>
        ))}
      </KanbanBoard>
      <KanbanOverlay>
        <div className="bg-primary/10 size-full rounded-md" />
      </KanbanOverlay>
    </Kanban>
  );
}

const COLUMN_TITLES: Record<string, string> = {
  backlog: "Backlog",
  inProgress: "In Progress",
  done: "Done",
};

const data: Record<string, Task[]> = {
  backlog: [
    {
      id: 1,
      title: "Task 1",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2024-04-01",
    },
    {
      id: 2,
      title: "Task 2",
      priority: "medium",
      assignee: "Jane Smith",
      dueDate: "2024-04-05",
    },
    {
      id: 3,
      title: "Task 3",
      priority: "low",
      assignee: "Bob Johnson",
      dueDate: "2024-04-10",
    },
  ],
  inProgress: [
    {
      id: 4,
      title: "Task 4",
      priority: "high",
      assignee: "Alice Brown",
      dueDate: "2024-03-28",
    },
    {
      id: 5,
      title: "Task 5",
      priority: "medium",
      assignee: "Charlie Wilson",
      dueDate: "2024-04-02",
    },
  ],
  done: [
    {
      id: 7,
      title: "Task 6",
      priority: "high",
      assignee: "Eve Davis",
      dueDate: "2024-03-25",
    },
    {
      id: 8,
      title: "Task 7",
      priority: "low",
      assignee: "Frank White",
      dueDate: "2024-03-24",
    },
  ],
};
