import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { CONSTANTS } from "@/lib/constants";
import { Command } from "lucide-react";
import SidebarUser from "./sidebar-user";

export const MENU_ITEMS = [
  {
    title: "Form",
    items: [
      {
        title: "Input",
        href: "inputs",
      },
      {
        title: "Select",
        href: "selects",
      },
      {
        title: "Button",
        href: "buttons",
      },
      {
        title: "Checkbox, Radio and Switch",
        href: "checks-radios-switches",
      },
    ],
  },
  {
    title: "Other",
    items: [
      {
        title: "Dialog",
        href: "dialog",
      },
      {
        title: "Popover",
        href: "popover",
      },
      {
        title: "Navbar",
        href: "navbar",
      },
      {
        title: "Texts",
        href: "texts",
      },
      {
        title: "Special Effects",
        href: "special-effects",
      },
      {
        title: "Sortable",
        href: "sortable",
      },
      {
        title: "Carousels",
        href: "carousels",
      },
      {
        title: "Animated Background",
        href: "animated-background",
      },
      {
        title: "Bento",
        href: "bento",
      },
      {
        title: "Progress Bar",
        href: "progress-bar",
      },
      {
        title: "Random",
        href: "random",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{CONSTANTS.TITLE}</span>
                  <span className="">v{process.env.package_version}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {MENU_ITEMS.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
}
