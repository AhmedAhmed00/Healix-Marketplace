import { Product } from '../types'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Electronics Bundle',
    description: 'High-quality electronics bundle including smartphone, tablet, and accessories',
    category: 'Electronics',
    brand: 'Multi-Brand',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
    saleType: 'outright sale',
    price: 2450,
    stock: 45,
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2026-01-20T14:30:00Z',
  },
  {
    id: '2',
    name: 'Designer Furniture Set',
    description: 'Modern designer furniture set for living room including sofa and coffee table',
    category: 'Furniture',
    brand: 'Elite Living',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop',
    saleType: 'outright sale',
    price: 1890,
    stock: 12,
    createdAt: '2025-01-15T09:00:00Z',
    updatedAt: '2026-01-22T11:00:00Z',
  },
  {
    id: '3',
    name: 'Smart Home Hub',
    description: 'Central brain for your smart home ecosystem with voice assistant support',
    category: 'Smart Home',
    brand: 'TechNexus',
    image: 'https://images.unsplash.com/photo-1558002038-103792e07a70?q=80&w=1974&auto=format&fit=crop',
    saleType: 'lease',
    price: 45,
    stock: 28,
    createdAt: '2025-01-20T14:00:00Z',
    updatedAt: '2026-01-23T09:00:00Z',
  },
  {
    id: '4',
    name: 'Luxury Sports Watch',
    description: 'Durable and elegant sports watch with heart rate tracking and GPS',
    category: 'Accessories',
    brand: 'Chronos',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
    saleType: 'outright sale',
    price: 1420,
    stock: 0,
    createdAt: '2025-01-25T11:00:00Z',
    updatedAt: '2026-01-18T16:00:00Z',
  },
  {
    id: '5',
    name: 'DSLR Professional Camera',
    description: 'Mirrorless camera with high resolution sensor and 4K video recording',
    category: 'Electronics',
    brand: 'VisionPro',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop',
    saleType: 'outright sale',
    price: 1280,
    stock: 15,
    createdAt: '2025-02-01T08:00:00Z',
    updatedAt: '2026-01-19T10:00:00Z',
  }
]

export function calculateProductStats(products: Product[]) {
  const stats = {
    total: products.length,
    active: 0,
    inactive: 0,
    outOfStock: 0,
    draft: 0,
    totalValue: 0,
  }

  products.forEach((product) => {
    // Basic logic for stats since status is removed
    if (product.stock > 0) stats.active++
    else stats.outOfStock++

    stats.totalValue += product.price * product.stock
  })

  return stats
}
