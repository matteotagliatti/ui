import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category, ComponentCategory, MyRegistryItem } from "./types";
import { categories, components } from "./const";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategory(slug: string): ComponentCategory | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getComponentsByCategory(category: Category): MyRegistryItem[] {
  return components.filter((component) => component.category === category);
}
