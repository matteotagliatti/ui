import { Category, MyRegistryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  component: MyRegistryItem;
  className?: string;
  category?: Category;
}

export function ComponentCard({
  children,
  component,
  className,
  category,
}: Props) {
  function getComponentCardClassName() {
    const classes: string[] = [];

    if (component.cols === 3) {
      classes.push(
        `lg:col-span-3 lg:border-l-0`,
        category ? "lg:!border-t" : "",
      );
    }

    const centeringCategories = [
      Category.Button,
      Category.Input,
      Category.Motion,
      Category.Dialog,
      Category.Other,
    ];

    if (
      centeringCategories.some((category) =>
        component.categories.includes(category),
      )
    ) {
      classes.push("flex items-center justify-center");
    }

    return classes.join(" ");
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
