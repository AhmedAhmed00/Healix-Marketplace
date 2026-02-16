import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import { Order } from '../types'
import { orderColumns } from './OrderTableColumns'
import { Package } from 'lucide-react'

interface OrdersListProps {
  orders: Order[]
  emptyMessage?: string
  count: string | number
}

export function OrdersList({ orders, count, emptyMessage = 'No orders found' }: OrdersListProps) {
  if (orders?.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Package className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
          <p className="text-lg font-medium text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none bg-transparent shadow-none hover:shadow-none">
      <CardContent className="px-0">
        <DataTable columns={orderColumns} data={orders || []} />
      </CardContent>
    </Card>
  )
}
