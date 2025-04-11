"use client";

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
import { useDebounce } from "@/registry/default/hooks/use-debounce";
import {
  CheckIcon,
  ChevronDown,
  ChevronsUpDown,
  LoaderCircle,
} from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type SelectOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type AsyncProps = {
  isAsync: true;
  onSearch: (query: string) => Promise<SelectOption[]>;
  debounceMs?: number;
  options?: SelectOption[];
};

type SyncProps = {
  isAsync?: false;
  onSearch?: never;
  debounceMs?: never;
  options: SelectOption[];
};

type BaseSelectFancyProps = {
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
  className?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  renderOption?: (option: SelectOption, isSelected: boolean) => React.ReactNode;
  renderSelected?: (option: SelectOption | SelectOption[]) => React.ReactNode;
} & (AsyncProps | SyncProps);

type SingleSelectProps = BaseSelectFancyProps & {
  multiple?: false;
  onChange?: (option: SelectOption) => void;
  value?: string;
};

type MultipleSelectProps = BaseSelectFancyProps & {
  multiple: true;
  onChange: (options: SelectOption[]) => void;
  value?: string[];
};

type Props = SingleSelectProps | MultipleSelectProps;

export function SelectFancy({
  options = [],
  onChange,
  value,
  disabled = false,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  slim = false,
  multiple = false,
  className,
  renderOption,
  renderSelected,
  isAsync,
  onSearch,
  debounceMs = 300,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [asyncOptions, setAsyncOptions] = useState<SelectOption[]>([]);
  const [forceUpdateKey, setForceUpdateKey] = useState(0);
  const [shouldFocus, setShouldFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useDebounce(searchQuery, debounceMs);

  const displayOptions = useMemo(() => {
    if (isAsync) {
      if (debouncedSearch) {
        console.log("asyncOptions", asyncOptions);
        return asyncOptions;
      }

      return options;
    }

    console.log("searchQuery", searchQuery);

    if (!searchQuery) {
      return options;
    }
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isAsync,
    asyncOptions,
    options,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...(isAsync ? [debouncedSearch] : [searchQuery]),
  ]);

  useEffect(() => {
    if (!isAsync) {
      return;
    }

    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        const results = await onSearch(debouncedSearch);

        const wasFocused = document.activeElement === inputRef.current; // Check if input is focused

        setAsyncOptions(results || []);

        setForceUpdateKey((prev) => prev + 1); // Force a re-render and remember to focus
        if (wasFocused) {
          setShouldFocus(true);
        }
      } catch (error) {
        console.error("Error fetching options:", error);
        setAsyncOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedSearch) {
      fetchOptions();
    } else {
      setAsyncOptions([]);
    }
  }, [debouncedSearch, isAsync, onSearch]);

  useEffect(() => {
    if (shouldFocus && inputRef.current && isAsync) {
      // Focus the input after a small delay to ensure component is rendered
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
        setShouldFocus(false);
      }, 50);
    }
  }, [isAsync, shouldFocus, forceUpdateKey]);

  useEffect(() => {
    if (!value) {
      if (selectedOptions.length > 0) {
        setSelectedOptions([]);
      }
      return;
    }

    if (multiple && Array.isArray(value)) {
      const currentValues = selectedOptions.map((o) => o.value);
      const hasChanges =
        value.length !== currentValues.length ||
        !value.every((v) => currentValues.includes(v));

      if (hasChanges) {
        const initialOptions = options.filter((option) =>
          value.includes(option.value)
        );
        setSelectedOptions(initialOptions);
      }
    } else if (!multiple && typeof value === "string") {
      const currentValue = selectedOptions[0]?.value;
      if (value !== currentValue) {
        const initialOption = options.find((option) => option.value === value);
        setSelectedOptions(initialOption ? [initialOption] : []);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options, multiple]);

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
        <Command
          key={forceUpdateKey}
          className="w-full max-h-[200px] sm:max-h-[270px]"
          shouldFilter={!isAsync}
        >
          <CommandList>
            <div className="sticky top-0 z-10 bg-popover">
              <CommandInput
                ref={inputRef}
                placeholder={searchPlaceholder}
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
            </div>

            {isLoading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                <LoaderCircle className="mx-auto size-4 animate-spin opacity-60 mb-1" />
                <p>Searching...</p>
              </div>
            ) : (
              <>
                {displayOptions.length > 0 ? (
                  <CommandGroup>
                    {displayOptions.map((option, index) => (
                      <CommandItem
                        key={option.value || index}
                        onSelect={() => handleSelect(option)}
                        disabled={option.disabled}
                      >
                        {renderOption
                          ? renderOption(
                              option,
                              selectedOptions.some(
                                (o) => o.value === option.value
                              )
                            )
                          : defaultRenderOption(
                              option,
                              selectedOptions.some(
                                (o) => o.value === option.value
                              )
                            )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
