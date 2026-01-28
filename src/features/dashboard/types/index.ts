export interface Order {
  id: string
  clientName: string
  clientAvatar?: string
  product: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  seller: string
  amount: number
}

export interface DashboardStats {
  totalEarnings: number
  totalOrders: number
  totalClients: number
  totalProducts: number
  earningsChange: number
  ordersChange: number
  clientsChange: number
  productsChange: number
}

export interface RecentActivity {
  id: string
  type: 'order' | 'payment' | 'registration'
  message: string
  time: string
  icon: string
}

export interface OrderStatus {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  count: number
  color: string
}

export interface MostPaidOrder {
  id: string
  productName: string
  clientName: string
  amount: number
  date: string
  status: string
}

