import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { categories, components } from "./const";
import { Category, ComponentCategory, MyRegistryItem } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategory(slug: string): ComponentCategory | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getComponentsByCategory(category: Category): MyRegistryItem[] {
  return components.filter(
    (component) =>
      component.categories.includes(category) &&
      component.type === "registry:component",
  );
}

export const convertRegistryPaths = (content: string) => {
  return content
    .replace(/@\/registry\/default\/components/g, "@/components")
    .replace(/@\/registry\/default\/hooks/g, "@/hooks")
    .replace(/@\/registry\/default\/lib/g, "@/lib");
};
