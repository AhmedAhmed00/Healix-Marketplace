export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  orderNumber: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  clientAvatar?: string
  product: string
  productId: string
  quantity: number
  amount: number
  status: OrderStatus
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash'
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  shippingAddress: string
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
  trackingNumber?: string
  seller: string
  sellerId: string
  notes?: string
}

export interface OrderStats {
  total: number
  pending: number
  confirmed: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
}
