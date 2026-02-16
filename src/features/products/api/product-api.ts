import { Product, Category, ApiPaginatedResponse } from '../types';
import { ENDOPOINTS } from '@/lib/endpoints';
import api from '@/lib/axios';


export async function fetchCategories(page: number) {
    const response = await api.get<ApiPaginatedResponse<Category>>(
        `${import.meta.env.VITE_API_URL}${ENDOPOINTS.CATEGORIES}`,
        {
            params: {
                page,
            }
        }
    );

    const data = response.data;

    return {
        total: data.count,
        items: data.results.map((category: Category) => ({
            value: category.id.toString(),
            label: category.name,
        }))
    }
}



export async function getProducts(params: Record<string, string | number>
): Promise<ApiPaginatedResponse<Product>> {
    const response = await api.get(
        `${import.meta.env.VITE_API_URL}${ENDOPOINTS.PRODUCTS}`,
        {
            params
        }



    );
    return response.data;
}


export async function getProductById(id: string): Promise<Product> {
    const response = await api.get(`${import.meta.env.VITE_API_URL}${ENDOPOINTS.PRODUCTS}${id}`);
    return response.data;
}



export async function createProduct(productData: FormData): Promise<Product> {
    const response = await api.post(`${import.meta.env.VITE_API_URL}${ENDOPOINTS.PRODUCTS}`, productData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

export async function deleteProduct(productId: string | number): Promise<void> {
    await api.delete(`${import.meta.env.VITE_API_URL}${ENDOPOINTS.PRODUCTS}${productId}/`);
}