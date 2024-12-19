import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { MENU_ITEMS } from "@/components/app-sidebar";

export type BreadcrumbItem = {
  title: string;
  href?: string;
  items?: BreadcrumbItem[];
};

export function getBreadcrumb(currentPath: string): BreadcrumbItem[] {
  // Remove leading slash and convert to lowercase
  const path = currentPath.replace(/^\//, "").toLowerCase();

  // If we're on the home page, return just the home item
  if (!path) {
    return [{ title: "Home", href: "/" }];
  }

  // Search through menu items to find the current page
  for (const section of MENU_ITEMS) {
    const matchingItem = section.items.find(
      (item) => item.href.toLowerCase() === path
    );

    if (matchingItem) {
      return [
        { title: "Home", href: "/" },
        {
          title: section.title,
          href: `#${section.title.toLowerCase()}`,
          items: section.items.map((item) => ({
            title: item.title,
            href: item.href,
          })),
        },
        { title: matchingItem.title },
      ];
    }
  }

  // Fallback if page not found in menu
  return [{ title: "Home", href: "/" }];
}
