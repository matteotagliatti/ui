"use client";

import { type FC, useState } from "react";
import { MultiSelectCombobox } from "./combobox-multi-select";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

const taskTypes = [
  { label: "Bug", value: "bug" },
  { label: "Story", value: "story" },
  { label: "Task", value: "task" },
  { label: "Subtask", value: "subtask" },
  { label: "Epic", value: "epic" },
];

/**
 * Interface for TaskTypeField props
 * @interface TaskTypeFieldProps
 */
interface TaskTypeFieldProps {
  className?: string;
}

/**
 * TaskTypeField Component
 *
 * A form field component that implements a multi-select combobox for task types.
 * Allows users to select multiple task types from a predefined list.
 *
 * Features:
 * - Multiple selection capability
 * - Dynamic label rendering based on selection count
 *
 * @component
 * @example
 * ```tsx
 * <TaskTypeField />
 * ```
 */
const TaskTypeField: FC<TaskTypeFieldProps> = ({ className }) => {
  // State to track selected task types
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  /**
   * Renders the selected items summary text
   * @param {string[]} values - Array of selected value IDs
   * @returns {string} Formatted selection summary
   */
  const handleRenderSelectedItem = (values: string[]): string => {
    if (values.length === 0) return "";

    if (values.length === 1) {
      return (
        taskTypes.find((option) => option.value === values[0])?.label ?? ""
      );
    }

    return `${values.length} selected`;
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label>Combobox Multi Select (Summary with 1 max)</Label>
      <MultiSelectCombobox
        label="Type"
        options={taskTypes}
        value={selectedTypes}
        onChange={setSelectedTypes}
        renderItem={(option) => (
          <div
            role="option"
            aria-selected={selectedTypes.includes(option.value)}
          >
            {option.label}
          </div>
        )}
        renderSelectedItem={handleRenderSelectedItem}
        aria-label="Filter by task type"
        aria-required="false"
        aria-multiselectable="true"
      />
    </div>
  );
};

export default TaskTypeField;
