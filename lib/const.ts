import registry from "@/registry.json";
import { Category, ComponentCategory, MyRegistryItem } from "./types";

export const site = {
  title: "UI Components",
  url: "https://mtui.vercel.app",
  author: "Matteo",
  authorUrl: "https://github.com/matteotagliatti",
} as const;

export const categories: ComponentCategory[] = [
  {
    slug: Category.Input,
    name: "Input",
  },
  {
    slug: Category.Button,
    name: "Button",
  },
  {
    slug: Category.Dialog,
    name: "Dialog",
  },
  {
    slug: Category.Motion,
    name: "Motion",
  },
];

export const components = registry.items.filter(
  (item) => item.type === "registry:component",
) as unknown as MyRegistryItem[];
