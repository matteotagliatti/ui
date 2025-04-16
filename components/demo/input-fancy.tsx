import { InputFancy } from "@/registry/default/components/input-fancy";
import { User } from "lucide-react";
import { InputContainer } from "../input-container";
import { Label } from "../ui/label";

export default function InputFancyDemo() {
  return (
    <div className="space-y-4">
      <InputContainer>
        <Label htmlFor="input-fancy">Input Fancy (with icon)</Label>
        <InputFancy
          left={<User className="h-4 w-4" />}
          placeholder="Input Fancy"
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="input-fancy">Input Fancy (with text)</Label>
        <InputFancy
          left={<span>https://</span>}
          className="ps-16"
          placeholder="Input Fancy"
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="input-fancy">Input Fancy (inline)</Label>
        <InputFancy
          inline
          left={<User className="h-4 w-4" />}
          placeholder="Input Fancy"
          type="text"
        />
      </InputContainer>
    </div>
  );
}
