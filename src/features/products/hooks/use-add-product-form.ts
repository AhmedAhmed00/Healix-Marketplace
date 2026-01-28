import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { addProductSchema, type AddProductFormData, type AddProductFormInput } from '../schemas/product-schema'

export function useAddProductForm() {
    const navigate = useNavigate()

    const form = useForm<AddProductFormInput>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            name: '',
            category: undefined,
            description: '',
            image: undefined,
            saleType: 'outright sale',
            price: '',
            stock: '',
            brand: '',
        },
    })

    const handleSubmit = async (data: AddProductFormInput) => {
        const transformedData: AddProductFormData = {
            name: data.name,
            category: data.category,
            description: data.description,
            image: data.image,
            saleType: data.saleType,
            price: Number(data.price),
            stock: Number(data.stock),
            brand: data.brand || undefined,
        }

        console.log('New product data:', transformedData)

        try {
            // TODO: Add product to the database/state
            // await api.addProduct(transformedData)
            navigate('/products')
        } catch (error) {
            console.error('Failed to add product:', error)
        }
    }

    return {
        form,
        handleSubmit: form.handleSubmit(handleSubmit),
        isSubmitting: form.formState.isSubmitting,
    }
}
