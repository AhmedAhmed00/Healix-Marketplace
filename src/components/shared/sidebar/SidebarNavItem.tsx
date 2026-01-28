import { Link } from "react-router"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import type { NavItem } from "./types"

interface SidebarNavItemProps {
  item: NavItem
  isActive: boolean
}

export function SidebarNavItem({ item, isActive }: SidebarNavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={item.url}>
          <item.icon style={{ width: '20px', height: '20px' }} />
          <span className="text-[16px]">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

