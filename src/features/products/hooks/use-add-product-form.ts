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
            description: '',
            category: undefined,
            price: '',
            compareAtPrice: '',
            cost: '',
            sku: '',
            barcode: '',
            stock: '',
            status: 'draft',
            tags: '',
            weight: '',
            length: '',
            width: '',
            height: '',
        },
    })

    const handleSubmit = async (data: AddProductFormInput) => {
        const transformedData: AddProductFormData = {
            name: data.name,
            description: data.description,
            category: data.category,
            price: Number(data.price),
            compareAtPrice: data.compareAtPrice ? Number(data.compareAtPrice) : undefined,
            cost: Number(data.cost),
            sku: data.sku,
            barcode: data.barcode || undefined,
            stock: Number(data.stock),
            status: data.status,
            tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : undefined,
            weight: data.weight ? Number(data.weight) : undefined,
            dimensions: data.length && data.width && data.height ? {
                length: Number(data.length),
                width: Number(data.width),
                height: Number(data.height),
            } : undefined,
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
