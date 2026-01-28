export type ProductStatus = 'active' | 'inactive' | 'out_of_stock' | 'draft'
export type ProductCategory = 'Electronics' | 'Furniture' | 'Smart Home' | 'Accessories' | 'Sports' | 'Home' | 'Clothing' | 'Books' | 'Toys' | 'Other'

export interface Product {
  id: string
  name: string
  title?: string
  description: string
  category: ProductCategory
  price: number
  compareAtPrice?: number
  cost: number
  sku: string
  barcode?: string
  stock: number
  status: ProductStatus
  images?: string[]
  seller: string
  sellerId: string
  createdAt: string
  updatedAt: string
  tags?: string[]
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
}

export interface ProductStats {
  total: number
  active: number
  inactive: number
  outOfStock: number
  draft: number
  totalValue: number
}

export interface AddProductFormData {
  name: string
  description: string
  category: ProductCategory
  price: number
  compareAtPrice?: number
  cost: number
  sku: string
  barcode?: string
  stock: number
  status: ProductStatus
  tags?: string[]
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
}
