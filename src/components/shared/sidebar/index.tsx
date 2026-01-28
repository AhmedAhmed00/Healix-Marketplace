import type { ComponentProps } from "react"
import { useNavigate } from 'react-router-dom'
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"
import { SidebarLogo } from "./SidebarLogo"
import { SidebarNavGroup } from "./SidebarNavGroup"
import { navigationSections } from "./navigationData"
import { useAuth } from "@/contexts/AuthContext"

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="">
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent className="">
        {navigationSections.map((section) => (
          <SidebarNavGroup key={section.label} section={section} />
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start shadow-none gap-2 bg-transparent hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

// Re-export subcomponents
export { SidebarLogo } from "./SidebarLogo"
export { SidebarNavGroup } from "./SidebarNavGroup"
export { SidebarNavItem } from "./SidebarNavItem"
export { navigationSections } from "./navigationData"
export type { NavItem, NavSection } from "./types"

