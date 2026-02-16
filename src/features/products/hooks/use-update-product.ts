import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ENDOPOINTS } from "@/lib/endpoints";
import { toast } from "react-toastify";

export const useUpdateProduct = (productId?: string) => {
    const queryClient = useQueryClient();

    const { mutate, isError, status } = useMutation({
        mutationFn: async (productData: FormData) => {
            if (!productId) throw new Error("Product ID is required for update");

            const response = await api.patch(
                `${import.meta.env.VITE_API_URL}${ENDOPOINTS.PRODUCTS}${productId}/`,
                productData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success('Product updated successfully!');
            queryClient.invalidateQueries({ queryKey: ['products'] });
            if (productId) {
                queryClient.invalidateQueries({ queryKey: ['product', productId] });
            }
        },
        onError: (error) => {
            console.error('Failed to update product:', error);
            toast.error('Failed to update product. Please try again.');
        }
    });

    return { updateProduct: mutate, isError, status }
}
