/**
 * Maps pathname to breadcrumb/page title.
 */
export function getPageTitle(pathname: string): string {
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

  if (routes[pathname]) {
    return routes[pathname]
  }

  for (const [route, title] of Object.entries(routes)) {
    if (pathname.startsWith(route) && route !== '/') {
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
