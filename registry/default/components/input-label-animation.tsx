import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
}

export function InputWithLabelAnimation({ label }: Props) {
  return (
    <div className="group relative">
      <Label
        htmlFor="input-with-label-animation"
        className={cn(
          "origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground",
          "absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all",
          "group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium",
          "has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium",
        )}
      >
        <span className="bg-background inline-flex px-2">{label}</span>
      </Label>
      <Input
        className="!bg-background"
        id="input-with-label-animation"
        type="email"
        placeholder=""
      />
    </div>
  );
}
