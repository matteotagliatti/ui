import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputWithText() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-with-inline-text">Input with inline text</Label>
      <div className="flex rounded-lg shadow-sm shadow-black/5">
        <span className="inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground">
          https://
        </span>
        <Input
          id="input-with-inline-text"
          className="-ms-px rounded-s-none shadow-none"
          placeholder="google.com"
          type="text"
        />
      </div>
    </div>
  );
}
