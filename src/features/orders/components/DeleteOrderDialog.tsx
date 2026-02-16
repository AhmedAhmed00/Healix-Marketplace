import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertTriangle, Trash2 } from 'lucide-react'
import { Order } from '../types'
import { deleteOrder } from '../api/orders-api'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface DeleteOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
}

export function DeleteOrderDialog({
  open,
  onOpenChange,
  order,
}: DeleteOrderDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    if (!order) return

    setIsDeleting(true)
    try {
      await deleteOrder(order.id)
      
      // Invalidate orders query to refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      
      toast.success('Order deleted successfully')
      onOpenChange(false)
    } catch (error: any) {
      console.error('Error deleting order:', error)
      const errorMessage = error?.response?.data?.message || error?.response?.data?.detail || 'Failed to delete order'
      toast.error(errorMessage)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete Order
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this order? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <Alert variant="destructive" className="mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-semibold mb-1">Order #{order.order_summary.order_number}</div>
            <div className="text-sm">
              Client: {order.client_information.name}
              <br />
              Total: ${Number(order.payment_details.total).toLocaleString()}
            </div>
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Order
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
