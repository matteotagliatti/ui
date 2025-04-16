import { RegistryItem } from "shadcn/registry";

export enum Category {
  Button = "button",
  Input = "input",
  Motion = "motion",
  Dialog = "dialog",
  Other = "other",
}

export interface ComponentCategory {
  slug: Category;
  name: string;
}

export type MyRegistryItem = RegistryItem & {
  categories: Category[];
  usage?: boolean;
  cols?: number;
};

export enum ComponentPath {
  registry = "registry/default/components",
  demo = "components/demo",
}

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export type Config = {
  packageManager: PackageManager;
};
