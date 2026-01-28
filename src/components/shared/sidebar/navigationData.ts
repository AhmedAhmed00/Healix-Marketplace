import {
  Home,
  CreditCard,
  UserCircle,
  Cog,
  BarChart3,
  ShoppingCart,
  Receipt,
  Package,
  FolderTree,
  Megaphone,
  Users,
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
        title: "Profile",
        url: "/profile",
        icon: UserCircle,
      },
      {
        title: "Products",
        url: "/products",
        icon: Package,
      },
      {
        title: "Categories",
        url: "/categories",
        icon: FolderTree,
      },
      {
        title: "Ads",
        url: "/ads",
        icon: Megaphone,
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
        title: "Payment Logs",
        url: "/payment-logs",
        icon: Receipt,
      },
      {
        title: "Sales Analytics",
        url: "/sales-analytics",
        icon: BarChart3,
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

