import { useQuery } from "@tanstack/react-query"
import { getProductById, getProducts } from "../api/product-api"
import { useSearchParams } from "react-router"





export const useProducts = () => {
    const [searchParams] = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());
    const { data, isFetching, isError, isLoading } = useQuery({
        queryKey: ["products", params],
        queryFn: () =>
            getProducts({ ...params }),
    });
    return { data, isFetching, isError, isLoading };
};




export const useProduct = (id: string) => {

    const { data, isFetching, isError, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id)
    })
    return { data, isFetching, isError, isLoading }
}