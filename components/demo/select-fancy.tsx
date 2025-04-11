"use client";

import {
  SelectOption,
  SelectFancy,
} from "@/registry/default/components/select-fancy";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

export default function CountryDropdownDemo() {
  const options = [
    { label: "Option 1", value: "option1", icon: <User /> },
    { label: "Option 2", value: "option2", icon: <User /> },
    { label: "Option 3", value: "option3", icon: <User /> },
  ];

  const options2 = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const [selectedSingle, setSelectedSingle] = useState<SelectOption | null>(
    null
  );
  const [selectedMultiple, setSelectedMultiple] = useState<SelectOption[]>([]);
  const [selectedAsync, setSelectedAsync] = useState<SelectOption | null>(null);

  return (
    <div className="space-y-8 w-[300px]">
      <div className="space-y-2">
        <Label>Fancy Select (single)</Label>
        <SelectFancy
          value={selectedSingle?.value}
          onChange={(option) => {
            setSelectedSingle(option);
          }}
          options={options}
        />
      </div>
      <div className="space-y-2">
        <Label>Fancy Select (multiple)</Label>
        <SelectFancy
          multiple={true}
          value={selectedMultiple.map((option) => option.value)}
          onChange={(options) => {
            setSelectedMultiple(options);
          }}
          options={options}
        />
        <SelectFancy
          isAsync
          value={selectedAsync?.value}
          onSearch={async (query: string) => {
            const response = await fetch(
              `/api/select-options?q=${encodeURIComponent(query)}`
            );
            const data = await response.json();
            return data;
          }}
          debounceMs={500}
          onChange={(option) => {
            setSelectedAsync(option);
          }}
          placeholder="Search users..."
          options={options2}
        />
      </div>
    </div>
  );
}
