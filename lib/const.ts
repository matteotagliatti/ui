import registry from "@/registry.json";
import { ComponentCategory } from "./types";
import { RegistryItem } from "shadcn/registry";

export const components = registry.items as unknown as (RegistryItem & {
  category: string;
})[];

export const categories: ComponentCategory[] = [
  {
    slug: "button",
    name: "Button",
  },
];
