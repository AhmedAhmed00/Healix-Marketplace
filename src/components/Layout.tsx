import { ReactNode } from 'react'
import { useLocation } from 'react-router'
import { SidebarProvider, SidebarInset, SidebarTrigger } from './ui/sidebar'
import { AppSidebar } from './shared/sidebar'
import { Separator } from './ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { ModeToggle } from './mode-toggle'
import { NotificationPopover } from './shared/notifications'

interface LayoutProps {
  children: ReactNode
}

// Route to page title mapping
const getPageTitle = (pathname: string): string => {
  const routes: Record<string, string> = {
    '/': 'Overview',
    '/profile': 'Profile',
    '/orders': 'Orders',
    '/payments': 'Payments',
    '/payment-logs': 'Payment Logs',
    '/sales-analytics': 'Sales Analytics',
    '/about': 'About',
    '/form': 'Form Example',
    '/users': 'Users Table',
    '/products': 'Products',
    '/products/add': 'Add Product',
    '/categories': 'Categories',
    '/categories/add': 'Add Category',
    '/ads': 'Ads',
    '/ads/add': 'Add Ad',
    '/roles-and-employees': 'Roles & Employees',
    '/roles-and-employees/roles/add': 'Add Role',
    '/roles-and-employees/employees/add': 'Add Employee',
    '/settings': 'Settings',
  }

  // Check for exact match first
  if (routes[pathname]) {
    return routes[pathname]
  }

  // Check for prefix match (for nested routes like /appointments/details/1 or /products/view/1)
  for (const [route, title] of Object.entries(routes)) {
    if (pathname.startsWith(route) && route !== '/') {
      // Handle specific nested routes
      if (pathname.includes('/products/view/')) return 'View Product'
      if (pathname.includes('/products/add')) return 'Add Product'
      if (pathname.includes('/products/edit/')) return 'Edit Product'
      if (pathname.includes('/categories/view/')) return 'View Category'
      if (pathname.includes('/categories/add')) return 'Add Category'
      if (pathname.includes('/categories/edit/')) return 'Edit Category'
      if (pathname.includes('/ads/view/')) return 'View Ad'
      if (pathname.includes('/ads/add')) return 'Add Ad'
      if (pathname.includes('/ads/edit/')) return 'Edit Ad'
      if (pathname.includes('/roles-and-employees/roles/add')) return 'Add Role'
      if (pathname.includes('/roles-and-employees/roles/')) return 'Edit Role'
      if (pathname.includes('/roles-and-employees/employees/add')) return 'Add Employee'
      if (pathname.includes('/roles-and-employees/employees/')) return 'Edit Employee'
      return title
    }
  }

  return 'Page'
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const pageTitle = getPageTitle(location.pathname)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2
         border-b px-4 ">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  Healix
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <NotificationPopover />
            <ModeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 px-6 py-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

