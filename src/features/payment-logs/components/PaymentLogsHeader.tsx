import { PageHeader } from '@/components/shared/page-header'
import { Receipt } from 'lucide-react'

export function PaymentLogsHeader() {
  return (
    <PageHeader
      title="Payment Logs"
      description="View and track all payment transactions"
      icon={Receipt}
    />
  )
}
