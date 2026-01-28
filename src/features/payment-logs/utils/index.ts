import { PaymentLog } from '../types'

export interface FilterOptions {
  search?: string
  status?: PaymentLog['status']
  provider?: PaymentLog['paymentProvider']
}

export function filterPaymentLogs(paymentLogs: PaymentLog[], options: FilterOptions): PaymentLog[] {
  let filtered = [...paymentLogs]

  // Filter by search query
  if (options.search) {
    const searchLower = options.search.toLowerCase()
    filtered = filtered.filter(
      (log) =>
        log.paymentId.toLowerCase().includes(searchLower) ||
        log.orderNumber.toLowerCase().includes(searchLower) ||
        log.clientName.toLowerCase().includes(searchLower) ||
        log.clientEmail.toLowerCase().includes(searchLower) ||
        log.transactionId?.toLowerCase().includes(searchLower)
    )
  }

  // Filter by status
  if (options.status) {
    filtered = filtered.filter((log) => log.status === options.status)
  }

  // Filter by provider
  if (options.provider) {
    filtered = filtered.filter((log) => log.paymentProvider === options.provider)
  }

  return filtered
}

export function sortPaymentLogsByDate(paymentLogs: PaymentLog[], direction: 'asc' | 'desc' = 'desc'): PaymentLog[] {
  return [...paymentLogs].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return direction === 'asc' ? dateA - dateB : dateB - dateA
  })
}
