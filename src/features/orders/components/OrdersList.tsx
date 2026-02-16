import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import { Order } from '../types'
import { createOrderColumns } from './OrderTableColumns'
import { UpdateOrderStatusDialog } from './UpdateOrderStatusDialog'
import { DeleteOrderDialog } from './DeleteOrderDialog'
import { CancelOrderDialog } from './CancelOrderDialog'
import { Package } from 'lucide-react'

interface OrdersListProps {
  orders: Order[]
  emptyMessage?: string
  count: string | number
  isLoading?: boolean
}

export function OrdersList({ orders, count, emptyMessage = 'No orders found', isLoading = false }: OrdersListProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order)
    setIsStatusDialogOpen(true)
  }

  const handleDelete = (order: Order) => {
    setSelectedOrder(order)
    setIsDeleteDialogOpen(true)
  }

  const handleCancel = (order: Order) => {
    setSelectedOrder(order)
    setIsCancelDialogOpen(true)
  }

  const columns = createOrderColumns(handleUpdateStatus, handleDelete, handleCancel)

  if (!isLoading && orders?.length === 0) {
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
    <>
      <Card className="border-none bg-transparent shadow-none hover:shadow-none">
        <CardContent className="px-0">
          <DataTable 
            columns={columns} 
            data={orders || []} 
            count={count}
            manualPagination={true}
            pageSize={10}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
      <UpdateOrderStatusDialog
        open={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
        order={selectedOrder}
      />
      <DeleteOrderDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        order={selectedOrder}
      />
      <CancelOrderDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        order={selectedOrder}
      />
    </>
  )
}
