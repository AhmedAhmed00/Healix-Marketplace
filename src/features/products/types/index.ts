export type SaleType = 'outright sale' | 'lease'
export type ProductCategory = 'Electronics' | 'Furniture' | 'Smart Home' | 'Accessories' | 'Sports' | 'Home' | 'Clothing' | 'Books' | 'Toys' | 'Other'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  description: string
  image?: string
  saleType: SaleType
  price: number
  stock: number
  brand?: string
  createdAt: string
  updatedAt: string
}

export interface ProductStats {
  total: number
  active: number
  inactive: number
  outOfStock: number
  draft: number
  totalValue: number
}
