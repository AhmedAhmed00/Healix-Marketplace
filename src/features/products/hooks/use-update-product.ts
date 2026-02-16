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
        onError: (error: any) => {
            console.error('Failed to update product:', error);
            
            const errorData = error?.response?.data
            const hasFieldErrors = 
                (errorData?.errors && Object.keys(errorData.errors).length > 0) ||
                (errorData && typeof errorData === 'object' && 
                 Object.keys(errorData).some(key => 
                     key !== 'errors' && key !== 'message' && key !== 'detail' && 
                     Array.isArray(errorData[key])
                 ))
            
            if (!hasFieldErrors) {
                const errorMessage = errorData?.message || errorData?.detail || 'Failed to update product. Please try again.'
                toast.error(errorMessage)
            } else {
                toast.error('Please fix the errors in the form')
            }
        }
    });

    return { updateProduct: mutate, isError, status }
}
