"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command,
} from "@/components/ui/command";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, Loader2, Trash } from "lucide-react";
import { useDebounce } from "../hooks/use-debounce";
import { Button } from "@/components/ui/button";

type SelectFancyOption = {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
};

type SelectFancyBaseProps = {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  emptyText?: string;
  inputPlaceholder?: string;
  required?: boolean;
};

type SelectFancyProps = {
  options: SelectFancyOption[];
  value: string;
  onValueChange: (value: string) => void;
} & SelectFancyBaseProps;

function SelectFancy({
  options,
  value,
  onValueChange,
  placeholder,
  disabled,
  emptyText,
  inputPlaceholder,
  className,
  required,
}: SelectFancyProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover modal={false} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between has-[>span>svg]:px-3",
            className,
          )}
          disabled={disabled}
        >
          {value ? (
            options.find((option) => option.value === value)?.label
          ) : (
            <span className="text-muted-foreground">
              {placeholder || "Select an option"}
            </span>
          )}

          {value && !required ? (
            <span
              role="button"
              className="cursor-pointer"
              aria-label="Clear selection"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onValueChange("");
              }}
            >
              <Trash className="text-destructive size-4 shrink-0 cursor-pointer" />
            </span>
          ) : (
            <ChevronDown className="text-muted-foreground shrink-0" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput
            placeholder={inputPlaceholder || "Search"}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>{emptyText || "No options found"}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type SelectFancyMultipleProps = {
  options: SelectFancyOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
} & SelectFancyBaseProps;

function SelectFancyMultiple({
  options,
  value,
  onValueChange,
  placeholder,
  emptyText,
  inputPlaceholder,
  className,
  disabled,
  required,
}: SelectFancyMultipleProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (optionValue: string) => {
      const updatedSelected = value.includes(optionValue)
        ? value.filter((item) => item !== optionValue)
        : [...value, optionValue];
      onValueChange(updatedSelected);
    },
    [value, onValueChange],
  );

  const selectedLabels = useMemo(
    () =>
      value
        .map(
          (optionValue) =>
            options.find((option) => option.value === optionValue)?.label,
        )
        .filter(Boolean)
        .join(", "),
    [value, options],
  );

  return (
    <Popover modal={false} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between has-[>span>svg]:px-3",
            className,
          )}
          disabled={disabled}
        >
          <span className="truncate">
            {value.length > 0 ? (
              selectedLabels
            ) : (
              <span className="text-muted-foreground">
                {placeholder || "Select an option"}
              </span>
            )}
          </span>
          {value.length > 0 && !required ? (
            <span
              role="button"
              aria-label="Clear selection"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onValueChange([]);
              }}
            >
              <Trash className="text-destructive size-4 shrink-0 cursor-pointer" />
            </span>
          ) : (
            <ChevronDown className="text-muted-foreground shrink-0" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput
            placeholder={inputPlaceholder || "Search"}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>{emptyText || "No options found"}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type SelectFancyAsyncProps<T> = {
  onSearch: (query?: string) => Promise<T[]>;
  getInitialOptions?: () => Promise<T[]>;
  preload?: boolean;
  filterFn?: (option: T, query: string) => boolean;
  renderOption: (option: T) => React.ReactNode;
  getOptionValue: (option: T) => string;
  getDisplayValue: (option: T) => React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
} & SelectFancyBaseProps;

function SelectFancyAsync<T>({
  onSearch,
  getInitialOptions,
  preload,
  filterFn,
  renderOption,
  getOptionValue,
  getDisplayValue,
  emptyText,
  placeholder,
  value,
  onValueChange,
  disabled = false,
  className,
  inputPlaceholder,
  required,
}: SelectFancyAsyncProps<T>) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [selectedOption, setSelectedOption] = useState<T | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, preload ? 0 : 300);
  const [originalOptions, setOriginalOptions] = useState<T[]>([]);

  useEffect(() => {
    setMounted(true);
    setSelectedValue(value);
  }, [value]);

  // Initialize selectedOption when options are loaded and value exists
  useEffect(() => {
    if (value && options.length > 0) {
      const option = options.find((opt) => getOptionValue(opt) === value);
      if (option) {
        setSelectedOption(option);
      }
    }
  }, [value, options, getOptionValue]);

  // Effect for initial fetch
  useEffect(() => {
    const initializeOptions = async () => {
      try {
        setLoading(true);
        const data = await (getInitialOptions
          ? getInitialOptions()
          : onSearch(value));
        setOriginalOptions(data);
        setOptions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!mounted) {
      initializeOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, onSearch, getInitialOptions]);

  useEffect(() => {
    const searchOptions = async () => {
      try {
        setLoading(true);
        const data = await onSearch(debouncedSearchTerm);
        setOriginalOptions(data);
        setOptions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!mounted) {
      searchOptions();
    } else if (!preload) {
      searchOptions();
    } else if (preload) {
      if (debouncedSearchTerm) {
        setOptions(
          originalOptions.filter((option) =>
            filterFn ? filterFn(option, debouncedSearchTerm) : true,
          ),
        );
      } else {
        setOptions(originalOptions);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSearch, debouncedSearchTerm, mounted, preload, filterFn]);

  const handleSelect = useCallback(
    (currentValue: string) => {
      const newValue = currentValue === selectedValue ? "" : currentValue;
      setSelectedValue(newValue);
      setSelectedOption(
        options.find((option) => getOptionValue(option) === newValue) || null,
      );
      onValueChange(newValue);
      setOpen(false);
    },
    [selectedValue, onValueChange, options, getOptionValue],
  );

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between has-[>span>svg]:px-3",
            className,
          )}
          disabled={disabled}
        >
          <span className="truncate">
            {selectedOption ? (
              getDisplayValue(selectedOption)
            ) : (
              <span className="text-muted-foreground">
                {placeholder || "Select an option"}
              </span>
            )}
          </span>
          {selectedValue && !required ? (
            <span
              role="button"
              aria-label="Clear selection"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setSelectedValue("");
                setSelectedOption(null);
                onValueChange("");
              }}
            >
              <Trash className="text-destructive size-4 shrink-0 cursor-pointer" />
            </span>
          ) : (
            <ChevronDown className="text-muted-foreground shrink-0" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command shouldFilter={false}>
          <div className="relative">
            <CommandInput
              className="relative"
              placeholder={inputPlaceholder || "Search"}
              value={searchTerm}
              onValueChange={(value) => {
                setSearchTerm(value);
              }}
            />
            {loading && open && (
              <div className="absolute top-1/2 right-2 flex -translate-y-1/2 transform items-center opacity-50">
                <Loader2 className="animate-spin" />
              </div>
            )}
          </div>

          <CommandList>
            {!loading && options.length === 0 && (
              <CommandEmpty>{emptyText ?? "No options found"}</CommandEmpty>
            )}
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={getOptionValue(option)}
                  value={getOptionValue(option)}
                  onSelect={handleSelect}
                >
                  {renderOption(option)}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValue === getOptionValue(option)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export {
  SelectFancy,
  type SelectFancyProps,
  SelectFancyMultiple,
  type SelectFancyMultipleProps,
  SelectFancyAsync,
  type SelectFancyAsyncProps,
  type SelectFancyOption,
};
