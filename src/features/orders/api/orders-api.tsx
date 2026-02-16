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

export interface UpdateOrderStatusData {
    status?: string;
    payment_status?: string;
    payment_method?: string;
    estimated_delivery_date?: string;
}

export async function updateOrderStatus(
    orderId: string | number,
    data: UpdateOrderStatusData
): Promise<Order> {
    const response = await api.patch(
        `${ENDOPOINTS.ORDERS}${orderId}/`,
        data
    );
    return response.data;
}

export async function deleteOrder(orderId: string | number): Promise<void> {
    await api.delete(`${ENDOPOINTS.ORDERS}${orderId}/`);
}

export async function acceptOrder(orderId: string | number): Promise<Order> {
    const response = await api.post(`${ENDOPOINTS.ORDERS}${orderId}/accept/`);
    return response.data;
}

export async function rejectOrder(orderId: string | number): Promise<Order> {
    const response = await api.post(`${ENDOPOINTS.ORDERS}${orderId}/reject/`);
    return response.data;
}