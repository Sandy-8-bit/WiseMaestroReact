import * as React from "react";
import {
  Command,
  Frame,
  Home,
  Map,
  PieChart,
} from "lucide-react";

import { NavMain } from "@/components/layout/NavMain";
import { NavRecents } from "@/components/layout/NavRecents";
import { NavUser } from "@/components/layout/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { appRoutes } from "@/routes/appRoutes";

const data = {
  user: {
    name: "Sabarish V S",
    email: "Sabarish_7@protonmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: appRoutes.home,
      icon: Home,
      active: true,
    },
  ],

  recentItems: [
    {
      name: "Full stack Web Development",
      url: "#",
      icon: Frame,
    },
    {
      name: "SQL Basics",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Git & GitHubFundamentals",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">DMIF</span>
                  <span className="truncate text-xs">Course</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavRecents recentItems={data.recentItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
