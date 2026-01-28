import { Order, DashboardStats } from '../types'

export const dashboardStats: DashboardStats = {
  totalEarnings: 456800,
  totalOrders: 1247,
  totalClients: 892,
  totalProducts: 156,
  earningsChange: 12.5,
  ordersChange: 15.2,
  clientsChange: 8.3,
  productsChange: 5.7,
}

export const upcomingOrders: Order[] = [
  {
    id: '1',
    clientName: 'Sarah Anderson',
    product: 'Premium Electronics Bundle',
    date: '2026-01-27',
    time: '09:00 AM',
    status: 'confirmed',
    seller: 'TechStore Pro',
    amount: 2450,
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    product: 'Designer Furniture Set',
    date: '2026-01-27',
    time: '10:30 AM',
    status: 'processing',
    seller: 'Home Decor Plus',
    amount: 1890,
  },
  {
    id: '3',
    clientName: 'James Wilson',
    product: 'Smart Home System',
    date: '2026-01-28',
    time: '11:00 AM',
    status: 'confirmed',
    seller: 'Smart Solutions Inc',
    amount: 1650,
  },
]

export const confirmedOrders: Order[] = upcomingOrders.filter(
  (order) => order.status === 'confirmed'
)

export const todayOrders: Order[] = upcomingOrders.filter(
  (order) => order.date === '2026-01-27'
)

