import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category, ComponentCategory } from "./types";
import { categories, components } from "./const";
import { RegistryItem } from "shadcn/registry";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategory(slug: string): ComponentCategory | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getComponentsByCategory(category: Category): RegistryItem[] {
  return components.filter((component) => component.category === category);
}
