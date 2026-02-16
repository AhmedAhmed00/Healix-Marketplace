import { useQuery } from '@tanstack/react-query'
import { fetchOrders } from '../api/orders-api'
import { useSearchParams } from 'react-router';

export const useOrders = (activeTab: string) => {
    const [searchParams] = useSearchParams();
    
    // Build params object from URL, filtering out empty values
    const params: Record<string, string | number> = {};
    
    // Status filter - use activeTab (from tabs) or URL param
    const statusParam = activeTab === 'all' ? '' : activeTab;
    if (statusParam) {
        params.status = statusParam;
    }
    
    // Payment status filter
    const paymentStatus = searchParams.get('payment_status');
    if (paymentStatus && paymentStatus !== 'all') {
        params.payment_status = paymentStatus;
    }
    
    // Date filters
    const startDate = searchParams.get('start_date');
    if (startDate) {
        params.start_date = startDate;
    }
    
    const endDate = searchParams.get('end_date');
    if (endDate) {
        params.end_date = endDate;
    }
    
    // Total filters
    const minTotal = searchParams.get('min_total');
    if (minTotal) {
        params.min_total = parseFloat(minTotal);
    }
    
    const maxTotal = searchParams.get('max_total');
    if (maxTotal) {
        params.max_total = parseFloat(maxTotal);
    }
    
    // Page parameter (default to 1 if not present)
    const page = searchParams.get('page') || '1';
    params.page = parseInt(page, 10);

    const { data, isFetching, isError, isLoading } = useQuery({
        queryKey: ["orders", params],
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        queryFn: () =>
            fetchOrders({ ...params }),
    });
    return { data, isFetching, isError, isLoading };
};



