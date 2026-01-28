import { PageHeader } from '@/components/shared/page-header'
import { ShoppingCart } from 'lucide-react'

export function OrdersHeader() {
  return (
    <PageHeader
      title="Orders Management"
      description="View and manage all marketplace orders"
      icon={ShoppingCart}
    />
  )
}
