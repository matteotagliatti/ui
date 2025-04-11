"use client";

import React, { useCallback, useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronsUpDown, CheckIcon } from "lucide-react";

export type SelectOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type BaseSelectFancyProps = {
  options: SelectOption[];
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
  className?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode;
  renderSelected?: (option: SelectOption | SelectOption[]) => React.ReactNode;
};

type SingleSelectProps = BaseSelectFancyProps & {
  multiple?: false;
  onChange?: (option: SelectOption) => void;
  defaultValue?: string;
};

type MultipleSelectProps = BaseSelectFancyProps & {
  multiple: true;
  onChange: (options: SelectOption[]) => void;
  defaultValue?: string[];
};

type SelectFancyProps = SingleSelectProps | MultipleSelectProps;

export function SelectFancy({
  options,
  onChange,
  defaultValue,
  disabled = false,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  slim = false,
  multiple = false,
  className,
  renderOption,
  renderSelected,
  ...props
}: SelectFancyProps) {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    if (!defaultValue) {
      if (selectedOptions.length > 0) {
        setSelectedOptions([]);
      }
      return;
    }

    if (multiple && Array.isArray(defaultValue)) {
      const currentValues = selectedOptions.map((o) => o.value);
      const hasChanges =
        defaultValue.length !== currentValues.length ||
        !defaultValue.every((v) => currentValues.includes(v));

      if (hasChanges) {
        const initialOptions = options.filter((option) =>
          defaultValue.includes(option.value)
        );
        setSelectedOptions(initialOptions);
      }
    } else if (!multiple && typeof defaultValue === "string") {
      const currentValue = selectedOptions[0]?.value;
      if (defaultValue !== currentValue) {
        const initialOption = options.find(
          (option) => option.value === defaultValue
        );
        setSelectedOptions(initialOption ? [initialOption] : []);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, options, multiple]);

  const handleSelect = useCallback(
    (option: SelectOption) => {
      if (multiple) {
        const newSelection = selectedOptions.some(
          (o) => o.value === option.value
        )
          ? selectedOptions.filter((o) => o.value !== option.value)
          : [...selectedOptions, option];

        setSelectedOptions(newSelection);
        (onChange as MultipleSelectProps["onChange"])?.(newSelection);
      } else {
        setSelectedOptions([option]);
        (onChange as SingleSelectProps["onChange"])?.(option);
        setOpen(false);
      }
    },
    [onChange, multiple, selectedOptions]
  );

  const defaultRenderOption = (option: SelectOption, isSelected: boolean) => (
    <div className="flex flex-grow items-center gap-2 overflow-hidden">
      {option.icon && (
        <div className="shrink-0 w-5 h-5 inline-flex items-center justify-center">
          {option.icon}
        </div>
      )}
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {option.label}
      </span>
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4 shrink-0",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );

  const defaultRenderSelected = (selected: SelectOption | SelectOption[]) => {
    if (Array.isArray(selected)) {
      return (
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          {selected.length} selected
        </span>
      );
    }

    return (
      <div className="flex items-center gap-2 overflow-hidden">
        {selected.icon && (
          <div className="shrink-0 w-4 h-4 inline-flex items-center justify-center">
            {selected.icon}
          </div>
        )}
        {slim === false && (
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {selected.label}
          </span>
        )}
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 hover:bg-secondary/80",
          slim && "gap-1 w-min",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {selectedOptions.length > 0 ? (
          <div className="flex items-center flex-grow gap-2 overflow-hidden">
            {renderSelected
              ? renderSelected(multiple ? selectedOptions : selectedOptions[0])
              : defaultRenderSelected(
                  multiple ? selectedOptions : selectedOptions[0]
                )}
          </div>
        ) : (
          <span className="flex items-center gap-2">{placeholder}</span>
        )}

        {!slim ? (
          <ChevronDown size={16} />
        ) : (
          <ChevronsUpDown size={16} className="text-muted-foreground" />
        )}
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <Command className="w-full max-h-[200px] sm:max-h-[270px]">
          <CommandList>
            <div className="sticky top-0 z-10 bg-popover">
              <CommandInput placeholder={searchPlaceholder} />
            </div>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option, index) => (
                <CommandItem
                  key={option.value || index}
                  onSelect={() => handleSelect(option)}
                  disabled={option.disabled}
                >
                  {renderOption
                    ? renderOption(
                        option,
                        selectedOptions.some((o) => o.value === option.value)
                      )
                    : defaultRenderOption(
                        option,
                        selectedOptions.some((o) => o.value === option.value)
                      )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
