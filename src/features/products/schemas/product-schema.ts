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

export const addProductSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters').max(100, 'Product name must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  category: z.enum(productCategories, {
    required_error: 'Please select a category',
  }),
  price: z.string().min(1, 'Price is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Price must be a positive number'),
  compareAtPrice: z.string().optional(),
  cost: z.string().min(1, 'Cost is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Cost must be a non-negative number'),
  sku: z.string().min(1, 'SKU is required').max(50, 'SKU must be less than 50 characters'),
  barcode: z.string().optional(),
  stock: z.string().min(1, 'Stock is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Stock must be a non-negative number'),
  status: z.enum(productStatuses, {
    required_error: 'Please select a status',
  }),
  tags: z.string().optional(),
  weight: z.string().optional(),
  length: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
})

export type AddProductFormInput = z.infer<typeof addProductSchema>

export interface AddProductFormData {
  name: string
  description: string
  category: typeof productCategories[number]
  price: number
  compareAtPrice?: number
  cost: number
  sku: string
  barcode?: string
  stock: number
  status: typeof productStatuses[number]
  tags?: string[]
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
}
