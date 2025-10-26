import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, FolderKanban, Image, FileText, Settings, LogOut, Home } from "lucide-react";

export function AppSidebar() {
  const [location] = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Manage Projects",
      url: "/admin/projects",
      icon: FolderKanban,
    },
    {
      title: "Gallery",
      url: "/admin/gallery",
      icon: Image,
    },
    {
      title: "Create Page",
      url: "/admin/cms",
      icon: FileText,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">K</span>
              </div>
              <div>
                <div className="text-sm font-bold leading-none">KVDL Admin</div>
                <div className="text-xs text-muted-foreground">Dashboard</div>
              </div>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`sidebar-link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild data-testid="sidebar-link-public">
              <Link href="/">
                <Home />
                <span>View Public Site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton data-testid="sidebar-button-logout">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
