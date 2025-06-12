"use client";

import { Label } from "@/components/ui/label";
import {
  SelectFancy,
  SelectFancyAsync,
  SelectFancyMultiple,
  type SelectFancyOption,
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

  const [selectedSingle, setSelectedSingle] = useState("");
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [selectedAsync, setSelectedAsync] = useState("");

  return (
    <div className="w-72 space-y-8">
      <InputContainer>
        <Label>Fancy Select (single)</Label>
        <SelectFancy
          value={selectedSingle}
          onValueChange={(value) => {
            setSelectedSingle(value);
          }}
          options={options}
        />
      </InputContainer>
      <InputContainer>
        <Label>Fancy Select (multiple)</Label>
        <SelectFancyMultiple
          value={selectedMultiple}
          onValueChange={(value) => {
            setSelectedMultiple(value);
          }}
          options={optionsWithIcons}
        />
      </InputContainer>
      <InputContainer>
        <Label>Fancy Select (async)</Label>
        <SelectFancyAsync<SelectFancyOption>
          value={selectedAsync}
          onValueChange={(value) => {
            setSelectedAsync(value);
          }}
          onSearch={async (query?: string) => {
            const response = await fetch(
              `/api/select-options?q=${encodeURIComponent(query || "")}`,
            );
            const data = await response.json();
            return data as SelectFancyOption[];
          }}
          renderOption={(option) => <div>{option.label}</div>}
          getOptionValue={(option) => option.value}
          getDisplayValue={(option) => option.label}
        />
      </InputContainer>
    </div>
  );
}
