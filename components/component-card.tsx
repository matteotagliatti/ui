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
      component.categories.includes(Category.Motion) ||
      component.categories.includes(Category.Dialog)
    ) {
      return "flex items-center justify-center";
    }

    return "";
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "group/item relative",
        "border-t first:border-t-0", // mobile
        // Desktop
        "lg:nth-[-n+3]:border-t-0", // remove top border from first row
        "lg:nth-[n+4]:border-t", // add top border to all other rows
        "border-r-0", // remove right border from all elements
        "border-l-0 lg:border-l lg:nth-[3n+1]:border-l-0",

        getComponentCardClassName(),
        className,
      )}
    >
      {children}
    </div>
  );
}
