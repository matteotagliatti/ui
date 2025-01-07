import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Command } from "lucide-react";
import { CONSTANTS } from "@/lib/constants";
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
        title: "Popover",
        href: "popover",
      },
      {
        title: "Carousels",
        href: "carousels",
      },
      {
        title: "Texts",
        href: "texts",
      },
      {
        title: "Data List",
        href: "data-list",
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
    </Sidebar>
  );
}
