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
        onError: (error) => {
            console.error('Failed to create product:', error);
            toast.error('Failed to create product. Please try again.');
        }
    });


    return { createProduct: mutate, isError, status }
}
