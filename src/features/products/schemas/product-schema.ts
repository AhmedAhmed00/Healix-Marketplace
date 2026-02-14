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

/** Lease period options when product is available for lease */
export const leasePeriods = ['daily', 'monthly', 'yearly'] as const
export type LeasePeriod = (typeof leasePeriods)[number]

const positiveNumberString = z
  .string()
  .min(1, 'Required')
  .refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Must be a positive number')

const nonNegativeNumberString = z
  .string()
  .min(1, 'Required')
  .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Must be zero or a positive number')

export const addProductSchema = z
  .object({
    name: z.string().min(3, 'Product name must be at least 3 characters').max(100, 'Product name must be less than 100 characters'),
    category: z.enum(productCategories, {
      required_error: 'Please select a category',
    }),
    description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
    image: z.any().optional(),
    lease: z.boolean(),
    outrightSale: z.boolean(),
    leasePeriod: z.enum(leasePeriods).optional(),
    leasePrice: z.string().optional(),
    insurancePrice: z.string().optional(),
    price: z.string().optional(),
    stock: z.string().min(1, 'Stock is required').refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Stock must be a non-negative number'),
    brand: z.string().optional(),
  })
  .refine((data) => data.lease || data.outrightSale, {
    message: 'Select at least one: Lease or Outright sale',
    path: ['lease'],
  })
  .refine(
    (data) => {
      if (!data.lease && !data.outrightSale) return true
      return data.price != null && data.price !== '' && !isNaN(Number(data.price)) && Number(data.price) > 0
    },
    { message: 'Actual price is required', path: ['price'] }
  )
  .refine(
    (data) => {
      if (!data.lease) return true
      return (
        data.leasePeriod != null &&
        data.leasePeriod !== '' &&
        data.leasePrice != null &&
        data.leasePrice !== '' &&
        !isNaN(Number(data.leasePrice)) &&
        Number(data.leasePrice) > 0 &&
        data.insurancePrice != null &&
        data.insurancePrice !== '' &&
        !isNaN(Number(data.insurancePrice)) &&
        Number(data.insurancePrice) >= 0
      )
    },
    {
      message: 'Lease period, lease price, and insurance price are required when Lease is selected',
      path: ['leasePrice'],
    }
  )

export type AddProductFormInput = z.infer<typeof addProductSchema>

export interface AddProductFormData {
  name: string
  category: (typeof productCategories)[number]
  description: string
  image?: string | File
  lease: boolean
  outrightSale: boolean
  leasePeriod?: LeasePeriod
  leasePrice?: number
  insurancePrice?: number
  price?: number
  stock: number
  brand?: string
}
