import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { addProductSchema, type AddProductFormInput } from '../schemas/product-schema'
import { useCreateProduct } from './use-create-product'

export function useAddProductForm() {
    const navigate = useNavigate()
    const { createProduct, status, isError } = useCreateProduct()

    const isSubmitting = status === 'pending'

    const form = useForm<AddProductFormInput>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            name: '',
            description: '',
            category: undefined,
            brand: '',
            sale_type: 'sale',
            price: '',
            stock: '',
            lease_period: undefined,
            lease_price: '',
            insurance_price: '',
            is_active: true,
            main_image: undefined,
            images: [],
        },
    })

    const handleSubmit = async (data: AddProductFormInput) => {
        // Transform form data to match API expectations
        const productData = transformFormDataToApiFormat(data)

        console.log('Creating product with data:', productData)

        createProduct(productData, {
            onSuccess: () => {
                navigate('/products')
            },
            onError: (error: any) => {
                console.error('Failed to create product:', error)
                // Handle specific error cases from API response
                if (error?.response?.data?.errors) {
                    Object.entries(error.response.data.errors).forEach(([field, messages]) => {
                        form.setError(field as any, {
                            type: 'manual',
                            message: Array.isArray(messages) ? messages[0] : messages as string,
                        })
                    })
                }
            }
        })
    }

    return {
        form,
        handleSubmit: form.handleSubmit(handleSubmit),
        isSubmitting,
        isError,
    }
}

/**
 * Transform form data to match backend API format
 */
function transformFormDataToApiFormat(data: AddProductFormInput) {
    // Create FormData for file uploads
    const formData = new FormData()

    // Add text fields
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('sale_type', data.sale_type)
    formData.append('price', data.price)
    formData.append('stock', data.stock)
    formData.append('is_active', data.is_active.toString())

    // Add optional fields
    if (data.brand) {
        formData.append('brand', data.brand)
    }

    if (data.sale_type === 'lease' || data.sale_type === 'both') {
        if (data.lease_period) {
            formData.append('lease_period', data.lease_period)
        }
        if (data.lease_price) {
            formData.append('lease_price', data.lease_price)
        }
        if (data.insurance_price) {
            formData.append('insurance_price', data.insurance_price)
        }
    }

    // Add main image if provided
    if (data.main_image instanceof File) {
        formData.append('main_image', data.main_image)
    }

    // Add additional images if provided
    if (data.images && data.images.length > 0) {
        data.images.forEach((image, index) => {
            if (image instanceof File) {
                formData.append(`images[${index}]`, image)
            }
        })
    }

    return formData
}