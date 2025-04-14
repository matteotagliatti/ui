import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/registry/default/components/input-phone";
import { InputContainer } from "../input-container";

export default function PhoneInputDemo() {
  return (
    <InputContainer>
      <Label htmlFor="phone-input">Phone Input</Label>
      <PhoneInput id="phone-input" placeholder="Phone Input" />
    </InputContainer>
  );
}
