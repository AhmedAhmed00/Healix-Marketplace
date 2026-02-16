import { useQuery } from '@tanstack/react-query'
import { getOrderById } from '../api/orders-api'

export function useOrder(orderId: string | null) {
    return useQuery({
        queryKey: ['order', orderId],
        queryFn: () => {
            if (!orderId) throw new Error('Order ID is required')
            return getOrderById(orderId)
        },
        enabled: !!orderId,
    })
}
