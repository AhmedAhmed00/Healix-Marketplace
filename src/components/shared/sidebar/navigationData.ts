import {
  Home,
  CreditCard,
  Cog,
  ShoppingCart,
  Package,
  Users,
  HeadphonesIcon,
} from "lucide-react"
import type { NavSection } from "./types"

export const navigationSections: NavSection[] = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        title: "Products",
        url: "/products",
        icon: Package,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "Orders",
        url: "/orders",
        icon: ShoppingCart,
      },
      {
        title: "Payments",
        url: "/payments",
        icon: CreditCard,
      },


      {
        title: "Support",
        url: "/support",
        icon: HeadphonesIcon,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Roles & Employees",
        url: "/roles-and-employees",
        icon: Users,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Cog,
      },
    ],
  },
]

