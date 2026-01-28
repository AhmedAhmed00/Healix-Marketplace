import { Order, OrderStatus } from '../types'

export interface FilterOptions {
  status?: OrderStatus | 'all'
  search?: string
}

export function filterOrders(orders: Order[], options: FilterOptions): Order[] {
  let filtered = [...orders]

  // Filter by status
  if (options.status && options.status !== 'all') {
    filtered = filtered.filter((order) => order.status === options.status)
  }

  // Filter by search query
  if (options.search) {
    const searchLower = options.search.toLowerCase()
    filtered = filtered.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.clientName.toLowerCase().includes(searchLower) ||
        order.clientEmail.toLowerCase().includes(searchLower) ||
        order.product.toLowerCase().includes(searchLower) ||
        order.seller.toLowerCase().includes(searchLower)
    )
  }

  return filtered
}

export function sortOrdersByDate(orders: Order[], direction: 'asc' | 'desc' = 'desc'): Order[] {
  return [...orders].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return direction === 'asc' ? dateA - dateB : dateB - dateA
  })
}

export function countOrdersByStatus(orders: Order[]): Record<OrderStatus | 'all', number> {
  const counts: Record<OrderStatus | 'all', number> = {
    all: orders.length,
    pending: 0,
    confirmed: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  }

  orders.forEach((order) => {
    counts[order.status] = (counts[order.status] || 0) + 1
  })

  return counts
}
