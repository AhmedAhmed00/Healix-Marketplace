import { useQuery } from '@tanstack/react-query'
import { fetchOrders } from '../api/orders-api'
import { useSearchParams } from 'react-router';

export const useOrders = (activeTab: string) => {
    console.log(activeTab, "ActiveTabFromUseOrdersHook")
    const [searchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());

    if (activeTab) params['status'] = activeTab
    if (activeTab === 'all') params['status'] = ''

    const { data, isFetching, isError, isLoading } = useQuery({
        queryKey: ["orders", params],
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
        queryFn: () =>
            fetchOrders({ ...params }),
    });
    return { data, isFetching, isError, isLoading };
};



