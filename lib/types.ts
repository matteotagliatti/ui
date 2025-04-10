import { RegistryItem } from "shadcn/registry";

export enum Category {
  Button = "button",
}

export interface ComponentCategory {
  slug: Category;
  name: string;
}

export type MyRegistryItem = RegistryItem & {
  category: Category;
};
