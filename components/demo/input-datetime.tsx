"use client";

import { InputDatetime } from "@/registry/default/components/input-datetime";
import { InputContainer } from "@/components/input-container";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function InputDatetimeDemo() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <InputContainer>
      <Label>Date</Label>
      <InputDatetime
        date={date}
        onChange={(date) => setDate(date)}
        time="12:00"
      />
    </InputContainer>
  );
}
