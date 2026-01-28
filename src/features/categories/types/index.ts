export type CategoryStatus = 'active' | 'inactive'

export interface Category {
  id: string
  name: string
  description?: string
  slug: string
  status: CategoryStatus
  productCount: number
  icon?: string
  createdAt: string
  updatedAt: string
}

export interface CategoryStats {
  total: number
  active: number
  inactive: number
  totalProducts: number
}

export interface AddCategoryFormData {
  name: string
  description?: string
  slug: string
  status: CategoryStatus
  icon?: string
}
