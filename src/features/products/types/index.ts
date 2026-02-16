export type SaleType = 'sale' | 'lease' | 'both'
export type LeasePeriod = 'daily' | 'monthly' | 'yearly'

export interface Category {
  id: number
  type: string
  name: string
  slug: string
  description: string
  is_active: boolean
  product_count: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: number
  name: string
  description: string
  category: number
  brand?: string
  sale_type: SaleType
  price: string
  stock: number
  lease_period?: LeasePeriod
  lease_price?: string
  insurance_price?: string
  is_active: boolean
  main_image?: string
  images?: string[]
  created_at: string
  updated_at: string
}

export interface ProductStats {
  total: number
  active: number
  inactive: number
  outOfStock: number
  draft: number
  totalValue: number
}

export interface ApiProductStats {
  total_products: number
  active_products: number
  out_of_stock: number
  total_inventory_value: string
}

export interface ApiPaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[];
  stats?: ApiProductStats;
}

export interface UpdateProfilePayload {
  first_name: string
  middle_name: string
  last_name: string
  bio: string
  image: File | null
}