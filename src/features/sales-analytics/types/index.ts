export interface SalesData {
  date: string
  revenue: number
  orders: number
  averageOrderValue: number
}

export interface ProductSales {
  id: string
  productName: string
  category: string
  sales: number
  revenue: number
  orders: number
  growth: number
}

export interface SalesByCategory {
  category: string
  revenue: number
  orders: number
  percentage: number
}

export interface SalesByRegion {
  region: string
  revenue: number
  orders: number
  growth: number
}

export interface SalesMetrics {
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  conversionRate: number
  revenueChange: number
  ordersChange: number
}
