import { useLocation } from "react-router"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { SidebarNavItem } from "./SidebarNavItem"
import type { NavSection } from "./types"

interface SidebarNavGroupProps {
  section: NavSection
}

export function SidebarNavGroup({ section }: SidebarNavGroupProps) {
  const location = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {section.items.map((item) => (
            <SidebarNavItem
              key={item.title}
              item={item}
              isActive={location.pathname === item.url}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

