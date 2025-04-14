"use client";

import { Label } from "@/components/ui/label";
import {
  SelectFancy,
  SelectOption,
} from "@/registry/default/components/select-fancy";
import { User } from "lucide-react";
import { useState } from "react";
import { InputContainer } from "@/components/input-container";

export default function CountryDropdownDemo() {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const optionsWithIcons = [
    { label: "Option 1", value: "option1", icon: <User /> },
    { label: "Option 2", value: "option2", icon: <User /> },
    { label: "Option 3", value: "option3", icon: <User /> },
  ];

  const [selectedSingle, setSelectedSingle] = useState<SelectOption | null>(
    null,
  );
  const [selectedMultiple, setSelectedMultiple] = useState<SelectOption[]>([]);
  const [selectedAsync, setSelectedAsync] = useState<SelectOption | null>(null);

  return (
    <div className="w-72 space-y-8">
      <InputContainer>
        <Label>Fancy Select (single)</Label>
        <SelectFancy
          value={selectedSingle?.value}
          onChange={(option) => {
            setSelectedSingle(option);
          }}
          options={optionsWithIcons}
        />
      </InputContainer>
      <InputContainer>
        <Label>Fancy Select (multiple)</Label>
        <SelectFancy
          multiple={true}
          value={selectedMultiple.map((option) => option.value)}
          onChange={(options) => {
            setSelectedMultiple(options);
          }}
          options={optionsWithIcons}
        />
      </InputContainer>
      <InputContainer>
        <Label>Fancy Select (async)</Label>
        <SelectFancy
          isAsync
          value={selectedAsync?.value}
          onSearch={async (query: string) => {
            const response = await fetch(
              `/api/select-options?q=${encodeURIComponent(query)}`,
            );
            const data = await response.json();
            return data;
          }}
          debounceMs={500}
          onChange={(option) => {
            setSelectedAsync(option);
          }}
          placeholder="Search users..."
          options={options}
        />
      </InputContainer>
    </div>
  );
}
