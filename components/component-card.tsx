import { cn } from "@/lib/utils";
import { MyRegistryItem } from "@/lib/types";
import { Category } from "@/lib/types";

interface Props {
  children: React.ReactNode;
  component: MyRegistryItem;
  className?: string;
}

export function ComponentCard({ children, component, className }: Props) {
  function getComponentCardClassName() {
    switch (component.category) {
      case Category.Button:
        return "flex items-center justify-center";
      default:
        return "";
    }
  }
  return (
    <div
      className={cn(
        "group/item relative",
        getComponentCardClassName(),
        className
      )}
    >
      {children}
    </div>
  );
}
