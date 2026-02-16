import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../api/product-api'

export function useProduct(productId: string | null) {
    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => {
            if (!productId) throw new Error('Product ID is required')
            return getProductById(productId)
        },
        enabled: !!productId,
    })
}
