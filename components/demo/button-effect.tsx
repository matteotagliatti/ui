import { Button } from "@/registry/default/components/button-effect";
import { Plus } from "lucide-react";

export default function ButtonEffectDemo() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Button variant="destructive" effect="shine">
        Button
      </Button>
      <Button variant="default" effect="ringHover">
        Button
      </Button>
      <Button icon={Plus} iconPlacement="right" effect="expandIcon">
        Button
      </Button>
      <Button effect="gradientSlideShow" className="text-white">
        Button
      </Button>
    </div>
  );
}
