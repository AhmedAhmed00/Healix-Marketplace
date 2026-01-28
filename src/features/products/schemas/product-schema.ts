import { z } from 'zod'

export const productCategories = [
  'Electronics',
  'Furniture',
  'Smart Home',
  'Accessories',
  'Sports',
  'Home',
  'Clothing',
  'Books',
  'Toys',
  'Other',
] as const

export const productStatuses = ['active', 'inactive', 'out_of_stock', 'draft'] as const

export const saleTypes = ['outright sale', 'lease'] as const

export const addProductSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters').max(100, 'Product name must be less than 100 characters'),
  category: z.enum(productCategories, {
    required_error: 'Please select a category',
  }),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  image: z.any().optional(),
  saleType: z.enum(saleTypes, {
    required_error: 'Please select a sale type',
  }),
  price: z.string().min(1, 'Price is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Price must be a positive number'),
  stock: z.string().min(1, 'Stock is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Stock must be a non-negative number'),
  brand: z.string().optional(),
})

export type AddProductFormInput = z.infer<typeof addProductSchema>

export interface AddProductFormData {
  name: string
  category: typeof productCategories[number]
  description: string
  image?: string | File
  saleType: typeof saleTypes[number]
  price: number
  stock: number
  brand?: string
}
