import axios from 'axios';
import { Product } from '../types';



type PartialProduct = Partial<Product>

export async function fetchCategories(page: number) {
    const limit = 20;
    const skip = (page - 1) * limit;

    const response = await axios.get('https://dummyjson.com/products', {
        params: {
            limit,
            skip,
            select: 'id,title'
        }
    },);

    const data = response.data;

    console.log(response);

    return {
        total: data.total,
        items: data.products.map((p: PartialProduct) => ({
            value: p.id?.toString(),
            label: p.title,
        }))
    }
}
