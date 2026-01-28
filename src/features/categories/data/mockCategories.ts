import { Category } from '../types'

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Electronic devices, gadgets, and accessories',
    slug: 'electronics',
    status: 'active',
    productCount: 156,
    icon: '💻',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2026-01-20T14:30:00Z',
  },
  {
    id: '2',
    name: 'Furniture',
    description: 'Home and office furniture collections',
    slug: 'furniture',
    status: 'active',
    productCount: 89,
    icon: '🪑',
    createdAt: '2025-01-15T09:00:00Z',
    updatedAt: '2026-01-22T11:00:00Z',
  },
  {
    id: '3',
    name: 'Smart Home',
    description: 'Smart home automation and IoT devices',
    slug: 'smart-home',
    status: 'active',
    productCount: 67,
    icon: '🏠',
    createdAt: '2025-01-20T14:00:00Z',
    updatedAt: '2026-01-23T09:00:00Z',
  },
  {
    id: '4',
    name: 'Accessories',
    description: 'Fashion accessories and personal items',
    slug: 'accessories',
    status: 'active',
    productCount: 234,
    icon: '👓',
    createdAt: '2025-01-25T11:00:00Z',
    updatedAt: '2026-01-18T16:00:00Z',
  },
  {
    id: '5',
    name: 'Sports',
    description: 'Sports equipment and fitness gear',
    slug: 'sports',
    status: 'active',
    productCount: 112,
    icon: '⚽',
    createdAt: '2025-02-01T08:00:00Z',
    updatedAt: '2026-01-19T10:00:00Z',
  },
  {
    id: '6',
    name: 'Home',
    description: 'Home essentials and kitchen appliances',
    slug: 'home',
    status: 'active',
    productCount: 145,
    icon: '🏡',
    createdAt: '2025-02-05T12:00:00Z',
    updatedAt: '2026-01-15T13:00:00Z',
  },
  {
    id: '7',
    name: 'Clothing',
    description: 'Fashion and apparel',
    slug: 'clothing',
    status: 'inactive',
    productCount: 0,
    icon: '👕',
    createdAt: '2025-02-10T10:00:00Z',
    updatedAt: '2026-01-14T15:00:00Z',
  },
  {
    id: '8',
    name: 'Books',
    description: 'Books and educational materials',
    slug: 'books',
    status: 'active',
    productCount: 78,
    icon: '📚',
    createdAt: '2025-02-15T09:00:00Z',
    updatedAt: '2026-01-21T11:00:00Z',
  },
]

export function calculateCategoryStats(categories: Category[]) {
  const stats = {
    total: categories.length,
    active: 0,
    inactive: 0,
    totalProducts: 0,
  }

  categories.forEach((category) => {
    if (category.status === 'active') stats.active++
    if (category.status === 'inactive') stats.inactive++
    stats.totalProducts += category.productCount
  })

  return stats
}
