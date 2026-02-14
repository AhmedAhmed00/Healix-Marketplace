import { SalesData, ProductSales, SalesByCategory, SalesByRegion, SalesMetrics } from '../types'

const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'] as const

export const salesMetrics: SalesMetrics = {
  totalRevenue: 456800,
  totalOrders: 1247,
  averageOrderValue: 366.2,
  conversionRate: 3.2,
  revenueChange: 12.5,
  ordersChange: 15.2,
}

export const salesMetricsByCity: Record<string, SalesMetrics> = {
  'New York': {
    totalRevenue: 185000,
    totalOrders: 512,
    averageOrderValue: 361.3,
    conversionRate: 3.5,
    revenueChange: 14.2,
    ordersChange: 18.1,
  },
  'Los Angeles': {
    totalRevenue: 142000,
    totalOrders: 398,
    averageOrderValue: 356.8,
    conversionRate: 3.1,
    revenueChange: 11.8,
    ordersChange: 12.5,
  },
  'Chicago': {
    totalRevenue: 98000,
    totalOrders: 267,
    averageOrderValue: 367.0,
    conversionRate: 2.9,
    revenueChange: 9.5,
    ordersChange: 10.2,
  },
  'Houston': {
    totalRevenue: 42800,
    totalOrders: 118,
    averageOrderValue: 362.7,
    conversionRate: 2.8,
    revenueChange: 8.2,
    ordersChange: 7.8,
  },
  'Phoenix': {
    totalRevenue: 31000,
    totalOrders: 92,
    averageOrderValue: 336.9,
    conversionRate: 2.6,
    revenueChange: 6.5,
    ordersChange: 5.2,
  },
}

function withCity<T extends Record<string, unknown>>(
  rows: T[],
  city: (typeof CITIES)[number],
  revenueScale: number
): (T & { city: string })[] {
  return rows.map((row) => ({
    ...row,
    city,
    ...('revenue' in row && typeof row.revenue === 'number'
      ? { revenue: Math.round((row.revenue as number) * revenueScale) }
      : {}),
  }))
}

const salesDataBase: SalesData[] = [
  { date: '2026-01-01', revenue: 12500, orders: 42, averageOrderValue: 297.6 },
  { date: '2026-01-02', revenue: 15200, orders: 51, averageOrderValue: 298.0 },
  { date: '2026-01-03', revenue: 13800, orders: 48, averageOrderValue: 287.5 },
  { date: '2026-01-04', revenue: 16900, orders: 58, averageOrderValue: 291.4 },
  { date: '2026-01-05', revenue: 18200, orders: 62, averageOrderValue: 293.5 },
  { date: '2026-01-06', revenue: 19500, orders: 65, averageOrderValue: 300.0 },
  { date: '2026-01-07', revenue: 21000, orders: 70, averageOrderValue: 300.0 },
  { date: '2026-01-08', revenue: 19800, orders: 66, averageOrderValue: 300.0 },
  { date: '2026-01-09', revenue: 17500, orders: 59, averageOrderValue: 296.6 },
  { date: '2026-01-10', revenue: 18900, orders: 63, averageOrderValue: 300.0 },
  { date: '2026-01-11', revenue: 20100, orders: 67, averageOrderValue: 300.0 },
  { date: '2026-01-12', revenue: 21500, orders: 72, averageOrderValue: 298.6 },
  { date: '2026-01-13', revenue: 22800, orders: 76, averageOrderValue: 300.0 },
  { date: '2026-01-14', revenue: 24200, orders: 81, averageOrderValue: 298.8 },
  { date: '2026-01-15', revenue: 25600, orders: 85, averageOrderValue: 301.2 },
]

export const salesData: (SalesData & { city?: string })[] = [
  ...withCity(salesDataBase, 'New York', 0.38),
  ...withCity(salesDataBase, 'Los Angeles', 0.28),
  ...withCity(salesDataBase, 'Chicago', 0.20),
  ...withCity(salesDataBase, 'Houston', 0.09),
  ...withCity(salesDataBase, 'Phoenix', 0.05),
]

export const topProducts: ProductSales[] = [
  { id: '1', productName: 'Premium Electronics Bundle', category: 'Electronics', sales: 245, revenue: 24500, orders: 245, growth: 15.2 },
  { id: '2', productName: 'Designer Furniture Set', category: 'Furniture', sales: 189, revenue: 18900, orders: 189, growth: 12.5 },
  { id: '3', productName: 'Smart Home System', category: 'Smart Home', sales: 165, revenue: 16500, orders: 165, growth: 18.3 },
  { id: '4', productName: 'Luxury Watch Collection', category: 'Accessories', sales: 142, revenue: 14200, orders: 142, growth: 8.7 },
  { id: '5', productName: 'Professional Camera Kit', category: 'Electronics', sales: 128, revenue: 12800, orders: 128, growth: 22.1 },
  { id: '6', productName: 'Gaming Console Bundle', category: 'Electronics', sales: 115, revenue: 11500, orders: 115, growth: 10.5 },
  { id: '7', productName: 'Fitness Equipment Set', category: 'Sports', sales: 98, revenue: 9800, orders: 98, growth: 5.3 },
  { id: '8', productName: 'Kitchen Appliance Pack', category: 'Home', sales: 85, revenue: 8500, orders: 85, growth: 7.8 },
]

const salesByCategoryBase: SalesByCategory[] = [
  { category: 'Electronics', revenue: 145000, orders: 485, percentage: 31.7 },
  { category: 'Furniture', revenue: 98000, orders: 327, percentage: 21.5 },
  { category: 'Smart Home', revenue: 85000, orders: 283, percentage: 18.6 },
  { category: 'Accessories', revenue: 62000, orders: 207, percentage: 13.6 },
  { category: 'Sports', revenue: 42000, orders: 140, percentage: 9.2 },
  { category: 'Home', revenue: 24800, orders: 83, percentage: 5.4 },
]

const cityScale: Record<string, number> = {
  'New York': 0.38,
  'Los Angeles': 0.28,
  'Chicago': 0.2,
  'Houston': 0.09,
  Phoenix: 0.05,
}

export const salesByCategory: (SalesByCategory & { city?: string })[] = (
  ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'] as const
).flatMap((city) =>
  salesByCategoryBase.map((r) => ({
    ...r,
    city,
    revenue: Math.round(r.revenue * cityScale[city]),
    orders: Math.round(r.orders * cityScale[city]),
  }))
)

export const salesByRegion: SalesByRegion[] = [
  { region: 'North America', revenue: 185000, orders: 617, growth: 15.2 },
  { region: 'Europe', revenue: 142000, orders: 473, growth: 12.8 },
  { region: 'Asia Pacific', revenue: 98000, orders: 327, growth: 18.5 },
  { region: 'Latin America', revenue: 31800, orders: 106, growth: 8.3 },
]
