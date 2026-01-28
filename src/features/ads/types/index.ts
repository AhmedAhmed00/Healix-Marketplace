export type AdStatus = 'active' | 'inactive' | 'pending' | 'expired'
export type AdType = 'banner' | 'sidebar' | 'popup' | 'video' | 'sponsored'

export interface Ad {
  id: string
  title: string
  description?: string
  type: AdType
  status: AdStatus
  imageUrl?: string
  videoUrl?: string
  linkUrl: string
  startDate: string
  endDate: string
  impressions: number
  clicks: number
  budget: number
  spent: number
  advertiser: string
  advertiserId: string
  createdAt: string
  updatedAt: string
}

export interface AdStats {
  total: number
  active: number
  inactive: number
  pending: number
  expired: number
  totalBudget: number
  totalSpent: number
  totalImpressions: number
  totalClicks: number
}

export interface AddAdFormData {
  title: string
  description?: string
  type: AdType
  status: AdStatus
  imageUrl?: string
  videoUrl?: string
  linkUrl: string
  startDate: string
  endDate: string
  budget: number
  advertiser: string
}
