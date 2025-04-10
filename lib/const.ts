import registry from "@/registry.json";
import { Category, ComponentCategory, MyRegistryItem } from "./types";

export const categories: ComponentCategory[] = [
  {
    slug: Category.Button,
    name: "Button",
  },
];

export const components = registry.items as unknown as MyRegistryItem[];
