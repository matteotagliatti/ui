"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type OptionValue = string | number | boolean;

export interface OptionObject {
  [key: string]: OptionValue | undefined;
}

export type OptionType = OptionValue | OptionObject;

export interface SwitchFancyProps<T extends OptionType>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: T extends OptionObject ? T[keyof T] : T;
  onChange?: (value: T extends OptionObject ? T[keyof T] : T) => void;
  options: T[];
  valueKey?: keyof T & string;
  labelKey?: keyof T & string;
  disabledKey?: keyof T & string;
  className?: string;
  radioClassName?: string;
  highlighterClassName?: string;
  highlighterIncludeMargin?: boolean;
  highlighterStyle?: React.CSSProperties;
  disabledOptions?: Array<T extends OptionObject ? T[keyof T] : T>;
  renderOption?: (props: {
    option: T extends OptionObject
      ? T & { label: string; value: OptionValue; disabled: boolean }
      : { label: string; value: T; disabled: boolean };
    isSelected: boolean;
    getOptionProps: () => Record<string, unknown>;
  }) => React.ReactNode;
}

export function SwitchFancy<T extends OptionType>({
  options,
  valueKey = "value" as keyof T & string,
  labelKey = "label" as keyof T & string,
  disabledKey = "disabled" as keyof T & string,
  value,
  onChange,
  className,
  radioClassName,
  highlighterClassName,
  highlighterIncludeMargin = false,
  highlighterStyle: customHighlighterStyle,
  disabledOptions = [],
  renderOption,
  ...props
}: SwitchFancyProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const radioRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getOptionValue = useCallback(
    (option: T): OptionValue => {
      if (typeof option !== "object") {
        return option;
      }
      return option[valueKey] as OptionValue;
    },
    [valueKey]
  );

  const getOptionLabel = useCallback(
    (option: T): string => {
      if (typeof option !== "object") {
        return String(option);
      }
      return String(option[labelKey]);
    },
    [labelKey]
  );

  const isOptionDisabled = useCallback(
    (option: T): boolean => {
      const optionValue = getOptionValue(option);
      if (
        disabledOptions.includes(
          optionValue as T extends OptionObject ? T[keyof T] : T
        )
      ) {
        return true;
      }
      if (typeof option === "object" && disabledKey in option) {
        return Boolean(option[disabledKey]);
      }
      return false;
    },
    [disabledOptions, getOptionValue, disabledKey]
  );

  const memoizedOptions = useMemo(
    () =>
      options.map((option) => ({
        ...(typeof option === "object" ? option : {}),
        label: getOptionLabel(option),
        value: getOptionValue(option),
        disabled: isOptionDisabled(option),
      })) as Array<
        T extends OptionObject
          ? T & { label: string; value: OptionValue; disabled: boolean }
          : { label: string; value: T; disabled: boolean }
      >,
    [options, getOptionValue, getOptionLabel, isOptionDisabled]
  );

  const [activeIndex, setActiveIndex] = useState(() => {
    if (value === undefined) return 0;

    const index = memoizedOptions.findIndex((option) => option.value === value);
    if (index === -1) {
      console.warn(
        `SwitchFancy: No option found for value "${value}". Defaulting to first option.`
      );
      return 0;
    }
    return index;
  });

  const [highlighterStyle, setHighlighterStyle] = useState({
    height: 0,
    width: 0,
    transform: "translate(0, 0)",
  });

  const updateToggle = useCallback(() => {
    const selectedElement = radioRefs.current[activeIndex];
    const container = containerRef.current;

    if (selectedElement && container) {
      const containerRect = container.getBoundingClientRect();
      const selectedRect = selectedElement.getBoundingClientRect();

      const containerStyle = window.getComputedStyle(container);
      const selectedStyle = window.getComputedStyle(selectedElement);

      const containerPadding = {
        left: parseFloat(containerStyle.paddingLeft),
        top: parseFloat(containerStyle.paddingTop),
      };
      const containerBorder = {
        left: parseFloat(containerStyle.borderLeftWidth),
        top: parseFloat(containerStyle.borderTopWidth),
      };
      const selectedMargin = {
        left: parseFloat(selectedStyle.marginLeft),
        right: parseFloat(selectedStyle.marginRight),
        top: parseFloat(selectedStyle.marginTop),
        bottom: parseFloat(selectedStyle.marginBottom),
      };

      const translateX =
        selectedRect.left -
        containerRect.left -
        containerPadding.left -
        containerBorder.left -
        (highlighterIncludeMargin ? selectedMargin.left : 0);

      const translateY =
        selectedRect.top -
        containerRect.top -
        containerPadding.top -
        containerBorder.top -
        selectedMargin.top;

      setHighlighterStyle({
        height: selectedRect.height,
        width:
          selectedRect.width +
          (highlighterIncludeMargin
            ? selectedMargin.left + selectedMargin.right
            : 0),
        transform: `translate(${translateX}px, ${translateY}px)`,
      });
    }
  }, [activeIndex, highlighterIncludeMargin]);

  const handleChange = useCallback(
    (index: number) => {
      if (!memoizedOptions[index].disabled) {
        radioRefs.current[index]?.focus();
        setActiveIndex(index);
        onChange?.(
          memoizedOptions[index].value as T extends OptionObject
            ? T[keyof T]
            : T
        );
      }
    },
    [memoizedOptions, onChange]
  );

  const renderOptionContent = useCallback(
    (option: (typeof memoizedOptions)[0], index: number) => {
      const isSelected = index === activeIndex;

      if (renderOption) {
        return renderOption({
          option,
          isSelected,
          getOptionProps: () => ({
            ref: (el: HTMLDivElement | null) => (radioRefs.current[index] = el),
            role: "radio",
            "aria-checked": isSelected,
            tabIndex: isSelected && !option.disabled ? 0 : -1,
            onClick: () => handleChange(index),
            className: radioClassName,
            ...(isSelected ? { "data-checked": true } : {}),
            ...(option.disabled
              ? { "aria-disabled": true, "data-disabled": true }
              : {}),
            "aria-label": `${option.label} option`,
          }),
        });
      }

      return (
        <div
          ref={(el) => {
            radioRefs.current[index] = el;
          }}
          role="radio"
          aria-checked={isSelected}
          tabIndex={isSelected && !option.disabled ? 0 : -1}
          onClick={() => handleChange(index)}
          className={cn(
            "relative flex h-9 cursor-pointer items-center justify-center",
            "rounded-full px-3.5 text-sm font-medium transition-colors data-[checked]:text-primary-foreground",
            "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
            radioClassName
          )}
          {...(isSelected ? { "data-checked": true } : {})}
          {...(option.disabled
            ? { "aria-disabled": true, "data-disabled": true }
            : {})}
          aria-label={`${option.label} option`}
        >
          {option.label}
        </div>
      );
    },
    [activeIndex, renderOption, radioClassName, handleChange]
  );

  useEffect(() => {
    updateToggle();
  }, [updateToggle]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(updateToggle);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [updateToggle]);

  useEffect(() => {
    const newIndex = memoizedOptions.findIndex(
      (option) => option.value === value
    );
    if (newIndex !== -1 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }, [value, memoizedOptions, activeIndex]);

  return (
    <div
      role="radiogroup"
      aria-label="Switch options"
      ref={containerRef}
      className={cn("rounded-xl bg-muted p-2", className)}
      onKeyDown={(e) => {
        props.onKeyDown?.(e);

        if (!e.defaultPrevented) {
          switch (e.key) {
            case "ArrowDown":
            case "ArrowRight":
              e.preventDefault();
              const nextIndex = (activeIndex + 1) % options.length;
              handleChange(nextIndex);
              break;
            case "ArrowUp":
            case "ArrowLeft":
              e.preventDefault();
              const prevIndex =
                (activeIndex - 1 + options.length) % options.length;
              handleChange(prevIndex);
              break;
            default:
              break;
          }
        }
      }}
      {...props}
    >
      <div
        className={cn(
          "absolute transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "bg-primary rounded-full",
          highlighterClassName
        )}
        style={{
          ...highlighterStyle,
          ...customHighlighterStyle,
        }}
        aria-hidden="true"
        data-highlighter
      />

      {memoizedOptions.map((option, index) => (
        <React.Fragment key={option.value.toString()}>
          {renderOptionContent(option, index)}
        </React.Fragment>
      ))}

      <div
        aria-live="polite"
        className="absolute w-px h-px p-0 -m-px overflow-hidden clip-rect-0 whitespace-nowrap border-0"
      >
        {memoizedOptions[activeIndex]?.label} selected
      </div>
    </div>
  );
}
