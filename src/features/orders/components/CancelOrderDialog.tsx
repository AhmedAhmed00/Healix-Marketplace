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
import { Loader2, AlertTriangle, XCircle } from 'lucide-react'
import { Order } from '../types'
import { updateOrderStatus } from '../api/orders-api'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface CancelOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
}

export function CancelOrderDialog({
  open,
  onOpenChange,
  order,
}: CancelOrderDialogProps) {
  const [isCancelling, setIsCancelling] = useState(false)
  const queryClient = useQueryClient()

  const handleCancel = async () => {
    if (!order) return

    setIsCancelling(true)
    try {
      await updateOrderStatus(order.id, {
        status: 'cancelled',
      })
      
      // Invalidate orders query to refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      
      toast.success('Order cancelled successfully')
      onOpenChange(false)
    } catch (error: any) {
      console.error('Error cancelling order:', error)
      
      const errorData = error?.response?.data
      let errorMessage = 'Failed to cancel order'
      
      if (errorData) {
        if (errorData.status && Array.isArray(errorData.status)) {
          errorMessage = errorData.status[0]
        } else if (errorData.message) {
          errorMessage = errorData.message
        } else if (errorData.detail) {
          errorMessage = errorData.detail
        }
      }
      
      toast.error(errorMessage)
    } finally {
      setIsCancelling(false)
    }
  }

  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <AlertTriangle className="h-5 w-5" />
            Cancel Order
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this order? The order status will be changed to cancelled.
          </DialogDescription>
        </DialogHeader>

        <Alert className="mt-4 border-orange-200 bg-orange-50 dark:bg-orange-950/30">
          <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            <div className="font-semibold mb-1">Order #{order.order_summary.order_number}</div>
            <div className="text-sm">
              Client: {order.client_information.name}
              <br />
              Total: ${Number(order.payment_details.total).toLocaleString()}
              <br />
              Current Status: <span className="capitalize">{order.order_summary.status}</span>
            </div>
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isCancelling}
          >
            No, Keep Order
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleCancel}
            disabled={isCancelling}
          >
            {isCancelling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              <>
                <XCircle className="mr-2 h-4 w-4" />
                Yes, Cancel Order
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
