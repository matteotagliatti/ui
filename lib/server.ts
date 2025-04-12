"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { ComponentPath } from "./types";
import { convertRegistryPaths } from "./utils";

export async function readComponentSource(
  componentName: string,
  componentPath: ComponentPath,
) {
  const filePath = path.join(
    process.cwd(),
    componentPath,
    `${componentName}.tsx`,
  );
  try {
    const content = await fs.readFile(filePath, "utf8");
    if (componentPath === ComponentPath.demo) {
      return convertRegistryPaths(content);
    }
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}
