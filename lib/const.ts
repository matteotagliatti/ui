import registry from "@/registry.json";
import { Category, ComponentCategory, MyRegistryItem } from "./types";

export const site = {
  title: "UI Components",
  url: "https://mtui.vercel.app",
} as const;

export const categories: ComponentCategory[] = [
  {
    slug: Category.Button,
    name: "Button",
  },
];

export const components = registry.items.filter(
  (item) => item.type === "registry:component"
) as unknown as MyRegistryItem[];
