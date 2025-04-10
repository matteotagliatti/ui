import registry from "@/registry.json";
import { Category, ComponentCategory } from "./types";
import { RegistryItem } from "shadcn/registry";

export const categories: ComponentCategory[] = [
  {
    slug: Category.Button,
    name: "Button",
  },
];

export const components = registry.items as unknown as (RegistryItem & {
  category: Category;
})[];
