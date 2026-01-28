export type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded' | 'processing'
export type PaymentProvider = 'credit_card' | 'paypal' | 'bank_transfer' | 'stripe' | 'square'

export interface PaymentLog {
  id: string
  paymentId: string
  orderNumber: string
  orderId: string
  amount: number
  paymentProvider: PaymentProvider
  status: PaymentStatus
  date: string
  transactionId?: string
  clientName: string
  clientEmail: string
}
