import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SingleDayPicker } from '@/components/ui/single-day-picker'
import { Loader2 } from 'lucide-react'
import { Order, OrderStatus, PaymentStatus, PaymentMethod } from '../types'
import { updateOrderStatus, UpdateOrderStatusData } from '../api/orders-api'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], {
    required_error: 'Please select a status',
  }),
  payment_status: z.enum(['paid', 'unpaid', 'failed', 'refunded'], {
    required_error: 'Please select a payment status',
  }),
  payment_method: z.string().min(1, 'Please select a payment method'),
  estimated_delivery_date: z.date({
    required_error: 'Please select an estimated delivery date',
  }),
})

type UpdateOrderStatusFormValues = z.infer<typeof updateOrderStatusSchema>

interface UpdateOrderStatusDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order | null
}

export function UpdateOrderStatusDialog({
  open,
  onOpenChange,
  order,
}: UpdateOrderStatusDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<UpdateOrderStatusFormValues>({
    resolver: zodResolver(updateOrderStatusSchema),
    defaultValues: {
      status: undefined,
      payment_status: undefined,
      payment_method: '',
      estimated_delivery_date: undefined,
    },
  })

  // Reset form when order changes or dialog opens
  useEffect(() => {
    if (open && order) {
      const estimatedDate = order.delivery_information.estimated_delivery_date
        ? new Date(order.delivery_information.estimated_delivery_date)
        : undefined

      form.reset({
        status: order.order_summary.status,
        payment_status: order.payment_details.status as PaymentStatus,
        payment_method: order.payment_details.method || '',
        estimated_delivery_date: estimatedDate,
      })
    }
  }, [open, order, form])

  const handleSubmit = async (data: UpdateOrderStatusFormValues) => {
    if (!order) return

    setIsSubmitting(true)
    // Clear any previous errors
    form.clearErrors()
    
    try {
      const updateData: UpdateOrderStatusData = {
        status: data.status,
        payment_status: data.payment_status,
        payment_method: data.payment_method,
        estimated_delivery_date: format(data.estimated_delivery_date, 'yyyy-MM-dd'),
      }

      await updateOrderStatus(order.id, updateData)
      
      // Invalidate orders query to refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      
      toast.success('Order status updated successfully')
      onOpenChange(false)
    } catch (error: any) {
      console.error('Error updating order status:', error)
      
      const errorData = error?.response?.data
      
      // Handle field-specific errors
      if (errorData && typeof errorData === 'object') {
        let hasFieldErrors = false
        
        // Map API field names to form field names
        const fieldMapping: Record<string, keyof UpdateOrderStatusFormValues> = {
          status: 'status',
          payment_status: 'payment_status',
          payment_method: 'payment_method',
          estimated_delivery_date: 'estimated_delivery_date',
        }
        
        // Set errors for each field that has errors
        Object.keys(fieldMapping).forEach((apiField) => {
          if (errorData[apiField] && Array.isArray(errorData[apiField])) {
            const formField = fieldMapping[apiField]
            const errorMessage = errorData[apiField][0] // Get first error message
            form.setError(formField, {
              type: 'server',
              message: errorMessage,
            })
            hasFieldErrors = true
          }
        })
        
        // Show toast for general errors or if no field-specific errors were found
        if (!hasFieldErrors) {
          const generalError = errorData.message || errorData.detail || 'Failed to update order status'
          toast.error(generalError)
        } else {
          // Show a general message that there are validation errors
          toast.error('Please fix the errors in the form')
        }
      } else {
        // Fallback for unexpected error format
        toast.error(error?.response?.data?.message || 'Failed to update order status')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Update the status and payment information for order{' '}
            {order?.order_summary.order_number}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select order status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimated_delivery_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Delivery Date</FormLabel>
                  <FormControl>
                    <SingleDayPicker
                      value={field.value}
                      onSelect={field.onChange}
                      placeholder="Select delivery date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Status
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
