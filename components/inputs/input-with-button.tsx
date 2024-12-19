import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputWithButton() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-with-button">Input with button</Label>
      <div className="flex rounded-lg shadow-sm shadow-black/5">
        <Input
          id="input-with-button"
          className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
          placeholder="Email"
          type="email"
        />
        <button className="inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm font-medium text-foreground outline-offset-2 transition-colors hover:bg-accent hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50">
          Send
        </button>
      </div>
    </div>
  );
}
