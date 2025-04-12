import { Category, MyRegistryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  component: MyRegistryItem;
  className?: string;
}

export function ComponentCard({ children, component, className }: Props) {
  function getComponentCardClassName() {
    if (
      component.categories.includes(Category.Button) ||
      component.categories.includes(Category.Input) ||
      component.categories.includes(Category.Motion)
    ) {
      return "flex items-center justify-center";
    }
    return "";
  }
  return (
    <div
      className={cn(
        "group/item relative",
        getComponentCardClassName(),
        className,
      )}
    >
      {children}
    </div>
  );
}
