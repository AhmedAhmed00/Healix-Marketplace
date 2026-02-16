import { ENDOPOINTS } from '@/lib/endpoints';
import api from '@/lib/axios';
import { ApiPaginatedResponse, Product } from '@/features/products/types';
import { Order } from '../types';


export async function fetchOrders(params: Record<string, string | number>) {
    const response = await api.get<ApiPaginatedResponse<Order>>(
        `${ENDOPOINTS.ORDERS}`,
        {
            params
        }
    );
    const data = response.data;
    return data
}



export async function getOrderById(id: string): Promise<Order> {
    const response = await api.get(`${ENDOPOINTS.ORDERS}${id}`);
    return response.data;
}