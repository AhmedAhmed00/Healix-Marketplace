import { z } from 'zod'

/** Lease period options when product is available for lease */
export const leasePeriods = ['daily', 'monthly', 'yearly'] as const
export type LeasePeriod = (typeof leasePeriods)[number]

/** Sale type options */
export const saleTypes = ['sale', 'lease', 'both'] as const
export type SaleType = (typeof saleTypes)[number]

export const addProductSchema = z
  .object({
    name: z.string().min(3, 'Product name must be at least 3 characters').max(100, 'Product name must be less than 100 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
    category: z.string({ required_error: 'Category is required' }),
    brand: z.string().optional(),
    sale_type: z.enum(saleTypes, { required_error: 'Sale type is required' }),
    price: z.string().min(1, 'Price is required'),
    stock: z.string().min(1, 'Stock is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Stock must be a non-negative number'),
    lease_period: z.enum(leasePeriods).optional(),
    lease_price: z.string().optional(),
    insurance_price: z.string().optional(),
    is_active: z.boolean().default(true),
    main_image: z.any().optional(),
    images: z.array(z.any()).optional(),
  })
  .refine(
    (data) => {
      // If sale_type includes lease, lease_period is required
      if (data.sale_type === 'lease' || data.sale_type === 'both') {
        return data.lease_period != null && data.lease_period !== undefined
      }
      return true
    },
    {
      message: 'Lease period is required when sale type includes lease',
      path: ['lease_period'],
    }
  )
  .refine(
    (data) => {
      // If sale_type includes lease, lease_price is required
      if (data.sale_type === 'lease' || data.sale_type === 'both') {
        return (
          data.lease_price != null &&
          data.lease_price !== '' &&
          !isNaN(Number(data.lease_price)) &&
          Number(data.lease_price) > 0
        )
      }
      return true
    },
    {
      message: 'Lease price is required when sale type includes lease',
      path: ['lease_price'],
    }
  )
  .refine(
    (data) => {
      // If sale_type includes lease, insurance_price is required
      if (data.sale_type === 'lease' || data.sale_type === 'both') {
        return (
          data.insurance_price != null &&
          data.insurance_price !== '' &&
          !isNaN(Number(data.insurance_price)) &&
          Number(data.insurance_price) >= 0
        )
      }
      return true
    },
    {
      message: 'Insurance price is required when sale type includes lease',
      path: ['insurance_price'],
    }
  )
  .refine(
    (data) => {
      // Price must be a valid positive number
      return !isNaN(Number(data.price)) && Number(data.price) > 0
    },
    { message: 'Price must be a positive number', path: ['price'] }
  )

export type AddProductFormInput = z.infer<typeof addProductSchema>

export interface AddProductFormData {
  name: string
  description: string
  category: string
  brand?: string
  sale_type: SaleType
  price: string
  stock: string
  lease_period?: LeasePeriod
  lease_price?: string
  insurance_price?: string
  is_active: boolean
  main_image?: File
  images?: File[]
}
