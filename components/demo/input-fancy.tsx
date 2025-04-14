import { InputFancy } from "@/registry/default/components/input-fancy";
import { User } from "lucide-react";
export default function InputFancyDemo() {
  return (
    <InputFancy
      left={<User className="h-4 w-4" />}
      label="Input Fancy"
      placeholder="Input Fancy"
      type="text"
    />
  );
}
