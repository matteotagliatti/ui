"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/registry/default/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  time?: string;
  date?: Date | null;
  onChange?: (date: Date | null) => void;
}

export function InputDatetime({
  time: initialTime = "05:00",
  date: initialDate = null,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<string>(initialTime);
  const [date, setDate] = useState<Date | null>(initialDate);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    initialDate,
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const [hours, minutes] = time.split(":");
    selectedDate.setHours(parseInt(hours), parseInt(minutes));

    setDate(selectedDate);
    setSelectedDateTime(selectedDate);
    if (onChange) onChange(selectedDate);
    setIsOpen(false);
  };

  const handleTimeChange = (timeValue: string) => {
    setTime(timeValue);

    if (date) {
      const [hours, minutes] = timeValue.split(":");
      const newDate = new Date(date.getTime());
      newDate.setHours(parseInt(hours), parseInt(minutes));

      setDate(newDate);
      setSelectedDateTime(newDate);
      if (onChange) onChange(newDate);
    }
  };

  return (
    <div className="w-[220px] space-y-2">
      <div className="flex w-full flex-col">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDateTime && "text-muted-foreground",
              )}
            >
              {selectedDateTime ? (
                `${format(selectedDateTime, "PPP")}, ${time}`
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={date || undefined}
              onSelect={handleDateSelect}
              defaultMonth={date || new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col">
        <Select value={time} onValueChange={handleTimeChange}>
          <SelectTrigger className="w-[120px] font-normal focus:ring-0 focus:ring-offset-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[15rem]">
              {Array.from({ length: 96 }).map((_, i) => {
                const hour = Math.floor(i / 4)
                  .toString()
                  .padStart(2, "0");
                const minute = ((i % 4) * 15).toString().padStart(2, "0");
                return (
                  <SelectItem key={i} value={`${hour}:${minute}`}>
                    {hour}:{minute}
                  </SelectItem>
                );
              })}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
