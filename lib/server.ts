"use server";

import { promises as fs } from "node:fs";
import path from "node:path";

export async function readComponentSource(componentName: string) {
  const filePath = path.join(
    process.cwd(),
    "registry/default/components",
    `${componentName}.tsx`
  );
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}
