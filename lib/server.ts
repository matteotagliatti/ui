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

const TITLE_REGEX = /<title[^>]*>([^<]+)<\/title>/;
const OG_TITLE_REGEX = /<meta[^>]*property="og:title"[^>]*content="([^"]+)"/;
const DESCRIPTION_REGEX = /<meta[^>]*name="description"[^>]*content="([^"]+)"/;
const OG_DESCRIPTION_REGEX =
  /<meta[^>]*property="og:description"[^>]*content="([^"]+)"/;
const OG_IMAGE_REGEX = /<meta[^>]*property="og:image"[^>]*content="([^"]+)"/;

export const look = async (url: string) => {
  const response = await fetch(url);
  const data = await response.text();
  const titleMatch = data.match(TITLE_REGEX) || data.match(OG_TITLE_REGEX);
  const descriptionMatch =
    data.match(DESCRIPTION_REGEX) || data.match(OG_DESCRIPTION_REGEX);
  const imageMatch = data.match(OG_IMAGE_REGEX);

  return {
    title: titleMatch?.at(1) ?? null,
    description: descriptionMatch?.at(1) ?? null,
    image: imageMatch?.at(1) ?? null,
  };
};
