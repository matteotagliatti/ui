"use client";

import { type FC, useEffect, useState } from "react";
import { ChevronsUpDown, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * Props interface for the ComboBox component
 * @interface ComboBoxProps
 * @property {React.ReactNode} children - Content to be rendered in the dropdown list
 * @property {React.ReactNode} selectedItem - Currently selected item to display
 * @property {string} [placeholder] - Optional placeholder text for search input
 * @property {boolean} [isLoading] - Optional loading state indicator
 */
interface ComboBoxProps {
  children: React.ReactNode;
  selectedItem: React.ReactNode;
  placeholder?: string;
  isLoading?: boolean;
  closeOnSelect?: boolean;
}

/**
 * ComboBox Component
 *
 * A customizable single-select combobox with search functionality.
 * Features:
 * - Search filtering
 * - Loading state
 * - Accessible keyboard navigation
 * - Custom trigger display
 *
 * @param {ComboBoxProps} props - Component props
 * @returns {JSX.Element} The ComboBox component
 */
export const ComboBox: FC<ComboBoxProps> = ({
  children,
  selectedItem,
  placeholder = "Search...",
  isLoading = false,
  closeOnSelect = true,
}) => {
  // State for controlling popover
  const [open, setOpen] = useState(false);

  // Close the popover when the selected item changes
  useEffect(() => {
    if (closeOnSelect) {
      setOpen(false);
    }
  }, [selectedItem, closeOnSelect, setOpen]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls="combo-box-content"
          className="flex w-full items-center justify-between gap-2"
        >
          {/* Selected Item Display */}
          <span className="truncate" aria-label={`Selected: ${selectedItem}`}>
            {selectedItem}
          </span>

          {/* Status Indicators */}
          <div
            className="flex items-center justify-between gap-2"
            aria-hidden="true"
          >
            {/* Loading Indicator */}
            {isLoading && (
              <Loader2
                className="size-4 animate-spin opacity-50"
                aria-hidden="true"
              />
            )}
            {/* Dropdown Indicator */}
            <ChevronsUpDown
              className="size-4 shrink-0 opacity-50"
              aria-hidden="true"
            />
          </div>
        </Button>
      </PopoverTrigger>

      {/* Dropdown Content */}
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        id="combo-box-content"
      >
        <Command className="w-full" aria-label="Search and select options">
          {/* Search Input */}
          <CommandInput placeholder={placeholder} aria-label={placeholder} />

          {/* Options List */}
          <CommandList aria-label="Available options">
            {/* Empty State */}
            <CommandEmpty role="status" aria-live="polite">
              No items found.
            </CommandEmpty>

            {/* Options Group */}
            <CommandGroup role="listbox" aria-label="Options">
              {children}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

///

import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

type Language = {
  /** Unique identifier for the language (typically language code) */
  id: string;
  /** Base name of the language */
  name: string;
  /** Optional display name with region/variant information */
  displayName?: string;
  /** URL to the country flag image associated with the language */
  flagUrl: string;
};

const languages: Language[] = [
  {
    id: "en-us",
    name: "English US",
    displayName: "English",
    flagUrl: "/images/flags/us.svg",
  },
  {
    id: "en-gb",
    name: "English British",
    displayName: "English",
    flagUrl: "/images/flags/gb.svg",
  },
  {
    id: "fr",
    name: "Français",
    displayName: "French",
    flagUrl: "/images/flags/fr.svg",
  },
  {
    id: "de-de",
    name: "Deutsch",
    displayName: "German",
    flagUrl: "/images/flags/de.svg",
  },
  {
    id: "es-es",
    name: "Español",
    displayName: "Spanish",
    flagUrl: "/images/flags/es.svg",
  },
  {
    id: "it",
    name: "Italiano",
    displayName: "Italian",
    flagUrl: "/images/flags/it.svg",
  },
  {
    id: "pt",
    name: "Português",
    displayName: "Portuguese",
    flagUrl: "/images/flags/pt.svg",
  },
  {
    id: "nl",
    name: "Nederlands",
    displayName: "Dutch",
    flagUrl: "/images/flags/nl.svg",
  },
  {
    id: "pl",
    name: "Polski",
    displayName: "Polish",
    flagUrl: "/images/flags/pl.svg",
  },
  {
    id: "ru",
    name: "Русский",
    displayName: "Russian",
    flagUrl: "/images/flags/ru.svg",
  },
  {
    id: "ja-jp",
    name: "日本語",
    displayName: "Japanese",
    flagUrl: "/images/flags/jp.svg",
  },
  {
    id: "zh-cn",
    name: "中文",
    displayName: "Chinese",
    flagUrl: "/images/flags/cn.svg",
  },
  {
    id: "ko-kr",
    name: "한국어",
    displayName: "Korean",
    flagUrl: "/images/flags/kr.svg",
  },
  {
    id: "ar-sa",
    name: "العربية",
    displayName: "Arabic",
    flagUrl: "/images/flags/sa.svg",
  },
  {
    id: "hi-in",
    name: "हिन्दी",
    displayName: "Hindi",
    flagUrl: "/images/flags/in.svg",
  },
  {
    id: "tr-tr",
    name: "Türkçe",
    displayName: "Turkish",
    flagUrl: "/images/flags/tr.svg",
  },
  {
    id: "sv-se",
    name: "Svenska",
    displayName: "Swedish",
    flagUrl: "/images/flags/sv.svg",
  },
  {
    id: "da-dk",
    name: "Dansk",
    displayName: "Danish",
    flagUrl: "/images/flags/dk.svg",
  },
  {
    id: "fi",
    name: "Suomi",
    displayName: "Finnish",
    flagUrl: "/images/flags/fi.svg",
  },
  {
    id: "el-gr",
    name: "Ελληνικά",
    displayName: "Greek",
    flagUrl: "/images/flags/gr.svg",
  },
  {
    id: "cs-cz",
    name: "Čeština",
    displayName: "Czech",
    flagUrl: "/images/flags/cz.svg",
  },
  {
    id: "hu",
    name: "Magyar",
    displayName: "Hungarian",
    flagUrl: "/images/flags/hu.svg",
  },
  {
    id: "vi",
    name: "Tiếng Việt",
    displayName: "Vietnamese",
    flagUrl: "/images/flags/vi.svg",
  },
  {
    id: "th",
    name: "ไทย",
    displayName: "Thai",
    flagUrl: "/images/flags/th.svg",
  },
  {
    id: "id",
    name: "Bahasa Indonesia",
    displayName: "Indonesian",
    flagUrl: "/images/flags/id.svg",
  },
  {
    id: "he-il",
    name: "עברית",
    displayName: "Hebrew",
    flagUrl: "/images/flags/il.svg",
  },
];

/**
 * Props interface for LanguageItem component
 */
interface LanguageItemProps {
  language: Language;
  isSelected?: boolean;
}

/**
 * LanguageItem Component
 * Renders a language option with flag and formatted name
 *
 * @param {LanguageItemProps} props - Component props
 * @returns {JSX.Element} Language item with flag and name
 */
const LanguageItem: FC<LanguageItemProps> = ({ language, isSelected }) => {
  const displayName = language.displayName
    ? `${language.name} (${language.displayName})`
    : language.name;

  return (
    <div
      className="flex items-center gap-2"
      role="option"
      aria-selected={isSelected}
      aria-label={displayName}
    >
      {/* Language Flag */}
      <img
        className="size-6 rounded-sm object-cover"
        src={language.flagUrl}
        alt={`${language.name} flag`}
        loading="lazy"
        width={24}
        height={24}
      />

      {/* Language Name */}
      <span className="truncate">{displayName}</span>
    </div>
  );
};

/**
 * LanguageField Component
 *
 * A form field component for selecting languages with search and autocomplete.
 *
 * @returns {JSX.Element} Language selection field
 */
const LanguageField: FC = () => {
  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(
    null
  );

  // Find currently selected language
  const selectedLanguage = languages.find(
    (language) => language.id === selectedLanguageId
  );

  return (
    <div
      className="flex flex-col gap-2"
      role="region"
      aria-labelledby="language-field-label"
    >
      {/* Field Label */}
      <Label id="language-field-label" htmlFor="language-select">
        Combobox Single
      </Label>

      {/* Language Combobox */}
      <ComboBox
        placeholder="Select language..."
        selectedItem={
          selectedLanguage ? (
            <LanguageItem language={selectedLanguage} isSelected={true} />
          ) : (
            "Select language..."
          )
        }
        aria-labelledby="language-field-label"
        aria-required="true"
      >
        {/* Language Options */}
        {languages.map((language) => {
          const isSelected = selectedLanguageId === language.id;

          return (
            <CommandItem
              key={language.id}
              value={`${language.name} ${language.displayName || ""}`}
              onSelect={() => setSelectedLanguageId(language.id)}
              className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50"
              role="option"
              aria-selected={isSelected}
            >
              {/* Selection Indicator */}
              <Check
                className={cn(
                  "mr-2 h-4 w-4 transition-opacity",
                  isSelected ? "opacity-100" : "opacity-0"
                )}
                aria-hidden="true"
              />

              {/* Language Display */}
              <LanguageItem language={language} isSelected={isSelected} />

              {/* Screen Reader Description */}
              <span className="sr-only">
                {isSelected ? "Selected language: " : ""}
                {language.name}
              </span>
            </CommandItem>
          );
        })}
      </ComboBox>
    </div>
  );
};

export default LanguageField;
