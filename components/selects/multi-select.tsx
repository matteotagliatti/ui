"use client";
import { useState } from "react";
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/ui/multi-selector";
import { Label } from "../ui/label";

const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
];

const MultiSelectTest = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className="space-y-2">
      <Label>Multi Select</Label>
      <MultiSelector values={value} onValuesChange={setValue} loop={false}>
        <MultiSelectorTrigger>
          <MultiSelectorInput placeholder="Select your framework" />
        </MultiSelectorTrigger>
        <MultiSelectorContent>
          <MultiSelectorList>
            {options.map((option, i) => (
              <MultiSelectorItem key={i} value={option.value}>
                {option.label}
              </MultiSelectorItem>
            ))}
          </MultiSelectorList>
        </MultiSelectorContent>
      </MultiSelector>
    </div>
  );
};

export default MultiSelectTest;
