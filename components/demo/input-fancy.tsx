import { InputFancy } from "@/registry/default/components/input-fancy";
import { Send, User } from "lucide-react";
import { InputContainer } from "@/components/input-container";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function InputFancyDemo() {
  return (
    <div className="space-y-4">
      <InputContainer>
        <Label htmlFor="input-fancy">Input Fancy (with icon)</Label>
        <InputFancy
          inline
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
        <Label htmlFor="input-fancy">Input Fancy (with button)</Label>
        <InputFancy
          inline
          rightClassName="border-none p-0"
          right={
            <Button
              className="rounded-l-none !bg-transparent"
              variant="outline"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          }
          placeholder="Input Fancy"
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="input-fancy">Input Fancy (with select)</Label>
        <InputFancy
          inline
          leftClassName="border-none p-0"
          left={
            <Select>
              <SelectTrigger className="hover:text-primary w-[100px] rounded-r-none !bg-transparent">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="cherry">Cherry</SelectItem>
              </SelectContent>
            </Select>
          }
          placeholder="Input Fancy"
          type="text"
        />
      </InputContainer>
    </div>
  );
}
