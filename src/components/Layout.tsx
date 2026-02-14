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
import { HeaderProfileLink } from './HeaderProfileLink'
import { getPageTitle } from '@/lib/getPageTitle'

interface LayoutProps {
  children: ReactNode
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
            <HeaderProfileLink />
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

