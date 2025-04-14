"use client";

import { InputContainer } from "@/components/input-container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputFancyProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inline?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  placeholder: string;
  type: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  leftClassName?: string;
  rightClassName?: string;
}

export function InputFancy({
  required = false,
  inline = false,
  label,
  left,
  right,
  placeholder,
  type,
  helperText,
  errorText,
  leftClassName,
  rightClassName,
  ...props
}: InputFancyProps) {
  return (
    <InputContainer>
      {label && (
        <Label htmlFor={props.id}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div
        className={cn(
          "relative",
          inline && "flex rounded-md shadow-sm shadow-black/5",
        )}
      >
        {left && !inline && (
          <InputIcon className={leftClassName} icon={left} position="left" />
        )}
        {left && inline && (
          <InputInlineElement className={leftClassName} position="left">
            {left}
          </InputInlineElement>
        )}
        <Input
          id={props.id}
          className={cn(
            left && !inline && "peer ps-9",
            left && inline && "-ms-px rounded-s-none border-s-0 shadow-none",
            right && !inline && "peer pe-9",
            right && inline && "-ms-px rounded-e-none border-e-0 shadow-none",
          )}
          placeholder={placeholder}
          type={type}
        />
        {right && !inline && (
          <InputIcon className={rightClassName} icon={right} position="right" />
        )}
        {right && inline && (
          <InputInlineElement className={rightClassName} position="right">
            {right}
          </InputInlineElement>
        )}
      </div>
      {helperText ||
        (errorText && (
          <InputMessage helperText={helperText} errorText={errorText} />
        ))}
    </InputContainer>
  );
}

interface InputIconProps {
  icon: React.ReactNode;
  position: "left" | "right";
  className?: string;
}

function InputIcon({ icon, position, className }: InputIconProps) {
  return (
    <div
      className={cn(
        "text-muted-foreground/80 pointer-events-none absolute inset-y-0 flex items-center justify-center peer-disabled:opacity-50 [&_svg]:h-4 [&_svg]:w-4",
        position === "left" && "start-0 ps-3",
        position === "right" && "end-0 pe-3",
        className,
      )}
    >
      {icon}
    </div>
  );
}

interface InputInlineElementProps {
  children: React.ReactNode;
  position: "left" | "right";
  className?: string;
}

function InputInlineElement({
  children,
  position,
  className,
}: InputInlineElementProps) {
  return (
    <span
      className={cn(
        "border-input text-muted-foreground dark:bg-input/30 inline-flex items-center border bg-transparent px-3 text-sm",
        position === "left" && "rounded-s-md",
        position === "right" && "rounded-e-md",
        className,
      )}
    >
      {children}
    </span>
  );
}

interface InputMessageProps {
  helperText?: string;
  errorText?: string;
}

function InputMessage({ helperText, errorText }: InputMessageProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground text-sm",
        errorText && "text-red-500",
        helperText && "text-muted-foreground/80",
      )}
    >
      {helperText && <span>{helperText}</span>}
      {errorText && <span>{errorText}</span>}
    </p>
  );
}
