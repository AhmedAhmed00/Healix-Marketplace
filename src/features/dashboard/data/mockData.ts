import { Order, DashboardStats } from '../types'

export const OVERVIEW_CITIES = ['All', 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'] as const
export type OverviewCity = (typeof OVERVIEW_CITIES)[number]

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

export const dashboardStatsByCity: Record<string, DashboardStats> = {
  'New York': {
    totalEarnings: 185000,
    totalOrders: 512,
    totalClients: 320,
    totalProducts: 68,
    earningsChange: 14.2,
    ordersChange: 18.1,
    clientsChange: 10.2,
    productsChange: 6.2,
  },
  'Los Angeles': {
    totalEarnings: 142000,
    totalOrders: 398,
    totalClients: 245,
    totalProducts: 52,
    earningsChange: 11.8,
    ordersChange: 12.5,
    clientsChange: 7.1,
    productsChange: 4.8,
  },
  'Chicago': {
    totalEarnings: 98000,
    totalOrders: 267,
    totalClients: 178,
    totalProducts: 24,
    earningsChange: 9.5,
    ordersChange: 10.2,
    clientsChange: 5.3,
    productsChange: 3.1,
  },
  'Houston': {
    totalEarnings: 42800,
    totalOrders: 118,
    totalClients: 89,
    totalProducts: 8,
    earningsChange: 8.2,
    ordersChange: 7.8,
    clientsChange: 4.1,
    productsChange: 2.5,
  },
  'Phoenix': {
    totalEarnings: 31000,
    totalOrders: 92,
    totalClients: 60,
    totalProducts: 4,
    earningsChange: 6.5,
    ordersChange: 5.2,
    clientsChange: 2.8,
    productsChange: 1.9,
  },
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
    city: 'New York',
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
    city: 'Los Angeles',
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
    city: 'Chicago',
  },
]

export const confirmedOrders: Order[] = upcomingOrders.filter(
  (order) => order.status === 'confirmed'
)

export const todayOrders: Order[] = upcomingOrders.filter(
  (order) => order.date === '2026-01-27'
)

