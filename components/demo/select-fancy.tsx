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

  const [selectedSingle, setSelectedSingle] = useState<SelectOption | null>(
    null
  );
  const [selectedMultiple, setSelectedMultiple] = useState<SelectOption[]>([]);

  return (
    <div className="space-y-8 w-[300px]">
      <div className="space-y-2">
        <Label>Fancy Select (single)</Label>
        <SelectFancy
          defaultValue={selectedSingle?.value}
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
          defaultValue={selectedMultiple.map((option) => option.value)}
          onChange={(options) => {
            setSelectedMultiple(options);
          }}
          options={options}
        />
      </div>
    </div>
  );
}
