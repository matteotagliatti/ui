import { RegistryItem } from "shadcn/registry";

export enum Category {
  Button = "button",
  Input = "input",
}

export interface ComponentCategory {
  slug: Category;
  name: string;
}

export type MyRegistryItem = RegistryItem & {
  category: Category;
  usage?: boolean;
};

export enum ComponentPath {
  registry = "registry/default/components",
  demo = "components/demo",
}

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export type Config = {
  packageManager: PackageManager;
};
