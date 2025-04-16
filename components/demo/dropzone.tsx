import { Dropzone } from "@/registry/default/components/dropzone";
import { Label } from "@/components/ui/label";
import { InputContainer } from "@/components/input-container";

export default function DropzoneDemo() {
  return (
    <InputContainer>
      <Label>Dropzone</Label>
      <Dropzone />
    </InputContainer>
  );
}
