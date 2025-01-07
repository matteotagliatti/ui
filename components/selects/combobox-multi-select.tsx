"use client";

import React, { FC, useState } from "react";
import { Check, ChevronsUpDown, ListFilter, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

/**
 * Base interface for option items in the multi-select combobox
 * @property label - Display text for the option
 * @property value - Unique identifier for the option
 */
export interface BaseOption {
  label: string;
  value: string;
}

/**
 * Generic type for extending BaseOption with additional properties
 */
export type Option<T extends BaseOption = BaseOption> = T;

/**
 * Props interface for the MultiSelectCombobox component
 * @template T - Type extending BaseOption
 */
interface Props<T extends BaseOption> {
  /** Label for the combobox */
  label: string;
  /** Custom render function for individual options */
  renderItem: (option: T) => React.ReactNode;
  /** Custom render function for selected items display */
  renderSelectedItem: (value: string[]) => React.ReactNode;
  /** Array of available options */
  options: T[];
  /** Array of selected values */
  value: string[];
  /** Callback function when selection changes */
  onChange: (value: string[]) => void;
  /** Optional placeholder text for search input */
  placeholder?: string;
}

/**
 * A customizable multi-select combobox component with type safety
 * @template T - Type extending BaseOption
 */
export const MultiSelectCombobox = <T extends BaseOption>({
  label,
  renderItem,
  renderSelectedItem,
  options,
  value,
  onChange,
  placeholder,
}: Props<T>) => {
  // State for controlling popover visibility
  const [open, setOpen] = useState(false);

  /**
   * Handles the selection/deselection of an option
   * @param currentValue - The value to toggle
   */
  const handleChange = (currentValue: string) => {
    onChange(
      value.includes(currentValue)
        ? value.filter((val) => val !== currentValue)
        : [...value, currentValue]
    );
  };

  /**
   * Clears all selected values
   */
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls="multi-select-options"
          aria-label={`Select ${label}`}
          tabIndex={0}
          className="flex h-10 min-w-[200px] cursor-pointer items-center justify-start gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setOpen(!open);
            }
          }}
        >
          {/* Icon and label section */}
          <ListFilter
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          {value.length > 0 && (
            <span className="text-muted-foreground">{label}</span>
          )}

          {/* Selected items display */}
          <div className="flex-1 overflow-hidden">
            {value.length > 0
              ? renderSelectedItem(value)
              : `Select ${label}...`}
          </div>

          {/* Control buttons */}
          <span className="z-10 ml-auto flex items-center gap-2">
            {value.length > 0 && (
              <button
                type="button"
                aria-label="Clear selection"
                className="z-10 rounded-sm opacity-50 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={handleClear}
              >
                <X className="size-4 shrink-0" />
              </button>
            )}
            <ChevronsUpDown
              className="size-4 shrink-0 opacity-50"
              aria-hidden="true"
            />
          </span>
        </div>
      </PopoverTrigger>

      {/* Dropdown content */}
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        id="multi-select-options"
      >
        <Command>
          <CommandInput
            placeholder={placeholder || `Search ${label}...`}
            aria-label={`Search ${label}`}
          />
          <CommandList>
            <CommandEmpty>No {label} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => handleChange(option.value)}
                  aria-selected={value.includes(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                    aria-hidden="true"
                  />
                  {renderItem(option)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

///

export const vegetables: Vegetable[] = [
  { value: "spinach", label: "Spinach", icon: "🥬", calories: 23 },
  { value: "broccoli", label: "Broccoli", icon: "🥦", calories: 55 },
  { value: "carrots", label: "Carrots", icon: "🥕", calories: 41 },
  { value: "kale", label: "Kale", icon: "🌿", calories: 33 },
  { value: "cauliflower", label: "Cauliflower", icon: "🥦", calories: 25 },
  { value: "bell_pepper", label: "Bell Pepper", icon: "🌶️", calories: 31 },
  { value: "asparagus", label: "Asparagus", icon: "🍀", calories: 20 },
  { value: "tomato", label: "Tomato", icon: "🍅", calories: 18 },
  { value: "zucchini", label: "Zucchini", icon: "🥒", calories: 17 },
  { value: "sweet_potato", label: "Sweet Potato", icon: "🍠", calories: 86 },
  { value: "cucumber", label: "Cucumber", icon: "🥒", calories: 16 },
  { value: "onion", label: "Onion", icon: "🧅", calories: 40 },
  { value: "mushroom", label: "Mushroom", icon: "🍄", calories: 22 },
  { value: "pumpkin", label: "Pumpkin", icon: "🎃", calories: 26 },
  { value: "green_beans", label: "Green Beans", icon: "🍃", calories: 31 },
  { value: "eggplant", label: "Eggplant", icon: "🍆", calories: 25 },
  { value: "lettuce", label: "Lettuce", icon: "🥗", calories: 15 },
  {
    value: "brussels_sprouts",
    label: "Brussels Sprouts",
    icon: "🟢",
    calories: 43,
  },
  { value: "radish", label: "Radish", icon: "🌰", calories: 16 },
  { value: "cabbage", label: "Cabbage", icon: "🍈", calories: 25 },
  { value: "beetroot", label: "Beetroot", icon: "🍠", calories: 43 },
  { value: "celery", label: "Celery", icon: "🌱", calories: 16 },
  { value: "parsley", label: "Parsley", icon: "🪴", calories: 36 },
  { value: "okra", label: "Okra", icon: "🥭", calories: 33 },
];

type OptionType = {
  /** Display text for the option */
  label: string;
  /** Underlying value for the option */
  value: string;
};

export type Vegetable = OptionType & {
  /** Nutritional value - calories per 100g */
  calories: number;
  /** URL to option's icon/image */
  icon: string;
};

interface VegetableOption extends Vegetable {}

interface VegetableFieldProps {
  className?: string;
}

const VegetableField: FC<VegetableFieldProps> = ({ className }) => {
  // State to track selected vegetables
  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([]);

  /**
   * Renders an individual vegetable option with icon
   * @param {VegetableOption} option - The vegetable option to render
   */
  const renderVegetableOption = (option: VegetableOption) => (
    <div
      className="flex items-center gap-2"
      role="option"
      aria-selected={selectedVegetables.includes(option.value)}
    >
      <span className="text-xl">{option.icon}</span>
      <span>
        {option.label} ({option.calories} calories)
      </span>
    </div>
  );

  /**
   * Renders the selected vegetables display
   * @param {string[]} value - Array of selected vegetable IDs
   */
  const renderSelectedVegetables = (value: string[]) => {
    if (value.length === 0) return "";

    return (
      <div
        className="flex items-center gap-0"
        role="list"
        aria-label={`${value.length} vegetables selected`}
      >
        {/* Display up to 5 avatars */}
        {value.slice(0, 5).map((vegetableId) => {
          const vegetable = vegetables.find((v) => v.value === vegetableId)!;
          return (
            <Tooltip key={vegetable.value}>
              <TooltipTrigger asChild>
                <div role="listitem">
                  <span className="text-xl">{vegetable.icon}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>{vegetable.label}</TooltipContent>
            </Tooltip>
          );
        })}

        {/* Overflow indicator */}
        {value.length > 5 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex size-6 items-center justify-center rounded-full bg-stone-100 text-[10px] text-stone-500 ring-2 ring-stone-300"
                role="listitem"
                aria-label={`Plus ${value.length - 5} more vegetables`}
              >
                +{value.length - 5}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {value.slice(5).map((vegetableId) => {
                const vegetable = vegetables.find(
                  (v) => v.value === vegetableId
                )!;
                return (
                  <div
                    key={vegetable.value}
                    className="flex items-center gap-2"
                  >
                    <span className="text-xl">{vegetable.icon}</span>
                    <span>{vegetable.label}</span>
                  </div>
                );
              })}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    );
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label>Combobox Multi Select (Icons)</Label>
      <MultiSelectCombobox<VegetableOption>
        label="Vegetable"
        options={vegetables.map((vegetable) => ({
          label: vegetable.label,
          value: vegetable.value,
          icon: vegetable.icon,
          calories: vegetable.calories,
        }))}
        value={selectedVegetables}
        onChange={setSelectedVegetables}
        renderItem={renderVegetableOption}
        renderSelectedItem={renderSelectedVegetables}
        aria-label="Filter by vegetable"
        aria-required="false"
        aria-multiselectable="true"
        aria-describedby="vegetable-field-description"
      />
      <span id="vegetable-field-description" className="sr-only">
        Select one or more vegetables. Shows up to 5 vegetable icons with a
        count for additional selections.
      </span>
    </div>
  );
};

export default VegetableField;
