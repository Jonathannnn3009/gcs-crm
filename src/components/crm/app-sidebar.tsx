import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  FileText,
  BadgeCheck,
  Landmark,
  Wallet,
  UserSquare2,
  Handshake,
  BarChart3,
  Settings,
} from "lucide-react";

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
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { team } from "@/data/crm-mock";
import { initials } from "@/lib/format";

const nav = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", to: "/", icon: LayoutDashboard }],
  },
  {
    label: "Pipeline",
    items: [
      { title: "Leads", to: "/leads", icon: Users },
      { title: "Applications", to: "/applications", icon: FileText },
      { title: "Sanctions", to: "/sanctions", icon: BadgeCheck },
      { title: "Disbursements", to: "/disbursements", icon: Landmark },
      { title: "Commissions", to: "/commissions", icon: Wallet },
    ],
  },
  {
    label: "People",
    items: [
      { title: "Team", to: "/team", icon: UserSquare2 },
      { title: "Sourcing Partners", to: "/sourcing-partners", icon: Handshake },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Reports", to: "/reports", icon: BarChart3 },
      { title: "Settings", to: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const admin = team[0];
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            GC
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground">Growth Capital</span>
            <span className="text-[11px] text-sidebar-foreground/60">DSA Console</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {nav.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={pathname === item.to} tooltip={item.title}>
                      <Link to={item.to} onClick={() => isMobile && setOpenMobile(false)}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-brand text-xs font-semibold text-brand-foreground">
              {initials(admin.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium text-sidebar-foreground">{admin.name}</span>
            <span className="text-[11px] text-sidebar-foreground/60">{admin.role}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
