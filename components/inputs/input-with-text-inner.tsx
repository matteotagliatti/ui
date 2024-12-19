import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputWithTextInner() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-with-inline-text-inner">
        Input with inline text inner
      </Label>
      <div className="relative">
        <Input
          id="input-with-inline-text-inner"
          className="peer ps-16"
          placeholder="google.com"
          type="text"
        />
        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
          https://
        </span>
      </div>
    </div>
  );
}
