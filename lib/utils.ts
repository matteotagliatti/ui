import registry from "@/registry.json";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ComponentCategory } from "./types";
import { categories } from "./const";
import { RegistryItem } from "shadcn/registry";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategory(slug: string): ComponentCategory | undefined {
  return categories.find((category) => category.slug === slug);
}

const components = registry.items as unknown as RegistryItem[];

export const getComponentsByNames = (names: string[]): RegistryItem[] => {
  const componentsMap = new Map(components.map((comp) => [comp.name, comp]));

  return names
    .map((name) => componentsMap.get(name))
    .filter((comp): comp is RegistryItem => comp !== undefined);
};
