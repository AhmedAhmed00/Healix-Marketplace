import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { addProductSchema, type AddProductFormInput } from '../schemas/product-schema'
import { useCreateProduct } from './use-create-product'
import { useUpdateProduct } from './use-update-product'
import { Product } from '../types'

interface UseProductFormOptions {
    mode: 'create' | 'update'
    productId?: string
    initialData?: Product
}

export function useProductForm({ mode, productId, initialData }: UseProductFormOptions) {
    const navigate = useNavigate()
    const { createProduct, status: createStatus, isError: isCreateError } = useCreateProduct()
    const { updateProduct, status: updateStatus, isError: isUpdateError } = useUpdateProduct(productId)

    const isSubmitting = createStatus === 'pending' || updateStatus === 'pending'
    const isError = isCreateError || isUpdateError

    const form = useForm<AddProductFormInput>({
        resolver: zodResolver(addProductSchema),
        values: mode === 'update' && initialData ? {
            name: initialData.name,
            description: initialData.description,
            category: initialData?.category?.toString() || '',
            brand: initialData.brand || '',
            sale_type: initialData.sale_type,
            price: initialData.price,
            stock: initialData.stock.toString(),
            lease_period: initialData.lease_period || undefined,
            lease_price: initialData.lease_price || '',
            insurance_price: initialData.insurance_price || '',
            is_active: initialData.is_active,
            main_image: undefined,
            images: [],
        } : undefined,
        defaultValues: {
            name: '',
            description: '',
            category: '',
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
        if (mode === 'create') {
            const productData = transformFormDataToApiFormat(data)
            createProduct(productData, {
                onSuccess: () => navigate('/products'),
                onError: (error: any) => handleApiErrors(error, form)
            })
        } else {
            // Update mode - send only changed fields
            const changedData = getChangedFields(data, initialData!)
            const productData = transformFormDataToApiFormat(changedData)

            updateProduct(productData, {
                onSuccess: () => navigate('/products'),
                onError: (error: any) => handleApiErrors(error, form)
            })
        }
    }

    return {
        form,
        handleSubmit: form.handleSubmit(handleSubmit),
        isSubmitting,
        isError,
    }
}

function handleApiErrors(error: any, form: any) {
    console.error('API Error:', error)
    if (error?.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([field, messages]) => {
            form.setError(field as any, {
                type: 'manual',
                message: Array.isArray(messages) ? messages[0] : messages as string,
            })
        })
    }
}

function getChangedFields(formData: AddProductFormInput, initialData: Product): Partial<AddProductFormInput> {
    const changed: Partial<AddProductFormInput> = {}

    if (formData.name !== initialData.name) changed.name = formData.name
    if (formData.description !== initialData.description) changed.description = formData.description
    if (formData.category !== initialData.category.toString()) changed.category = formData.category
    if (formData.brand !== (initialData.brand || '')) changed.brand = formData.brand
    if (formData.sale_type !== initialData.sale_type) changed.sale_type = formData.sale_type
    if (formData.price !== initialData.price) changed.price = formData.price
    if (formData.stock !== initialData.stock.toString()) changed.stock = formData.stock
    if (formData.lease_period !== initialData.lease_period) changed.lease_period = formData.lease_period
    if (formData.lease_price !== (initialData.lease_price || '')) changed.lease_price = formData.lease_price
    if (formData.insurance_price !== (initialData.insurance_price || '')) changed.insurance_price = formData.insurance_price
    if (formData.is_active !== initialData.is_active) changed.is_active = formData.is_active

    if (formData.main_image instanceof File) changed.main_image = formData.main_image
    if (formData.images && formData.images.length > 0) changed.images = formData.images

    return changed
}

function transformFormDataToApiFormat(data: Partial<AddProductFormInput>): FormData {
    const formData = new FormData()

    if (data.name !== undefined) formData.append('name', data.name)
    if (data.description !== undefined) formData.append('description', data.description)
    if (data.category !== undefined) formData.append('category', data.category)
    if (data.sale_type !== undefined) formData.append('sale_type', data.sale_type)
    if (data.price !== undefined) formData.append('price', data.price)
    if (data.stock !== undefined) formData.append('stock', data.stock)
    if (data.is_active !== undefined) formData.append('is_active', data.is_active.toString())

    if (data.brand !== undefined && data.brand !== '') {
        formData.append('brand', data.brand)
    }

    if (data.sale_type === 'lease' || data.sale_type === 'both') {
        if (data.lease_period) formData.append('lease_period', data.lease_period)
        if (data.lease_price) formData.append('lease_price', data.lease_price)
        if (data.insurance_price) formData.append('insurance_price', data.insurance_price)
    }

    if (data.main_image instanceof File) {
        formData.append('main_image', data.main_image)
    }

    if (data.images && data.images.length > 0) {
        data.images.forEach((image, index) => {
            if (image instanceof File) {
                formData.append(`images[${index}]`, image)
            }
        })
    }

    return formData
}
