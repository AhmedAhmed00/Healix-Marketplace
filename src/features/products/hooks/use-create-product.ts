import { QueryClient, useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ENDOPOINTS } from "@/lib/endpoints";
import { toast } from "react-toastify";

export const useCreateProduct = () => {
    const queryClient = new QueryClient();
    const { mutate, isError, status } = useMutation({
        mutationFn: async (productData: FormData) => {
            const response = await api.post(`${import.meta.env.VITE_API_URL}${ENDOPOINTS.PRODUCTS}`, productData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success('Product created successfully!');
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error: any) => {
            console.error('Failed to create product:', error);
            
            const errorData = error?.response?.data
            const hasFieldErrors = 
                (errorData?.errors && Object.keys(errorData.errors).length > 0) ||
                (errorData && typeof errorData === 'object' && 
                 Object.keys(errorData).some(key => 
                     key !== 'errors' && key !== 'message' && key !== 'detail' && 
                     Array.isArray(errorData[key])
                 ))
            
            if (!hasFieldErrors) {
                const errorMessage = errorData?.message || errorData?.detail || 'Failed to create product. Please try again.'
                toast.error(errorMessage)
            } else {
                toast.error('Please fix the errors in the form')
            }
        }
    });


    return { createProduct: mutate, isError, status }
}
