import { z } from 'zod'

export const adTypes = ['banner', 'sidebar', 'popup', 'video', 'sponsored'] as const
export const adStatuses = ['active', 'inactive', 'pending', 'expired'] as const

export const addAdSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  type: z.enum(adTypes, {
    required_error: 'Ad type is required',
  }),
  status: z.enum(adStatuses, {
    required_error: 'Status is required',
  }),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  videoUrl: z.string().url('Invalid video URL').optional().or(z.literal('')),
  linkUrl: z.string().url('Invalid link URL').min(1, 'Link URL is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  budget: z.string().min(1, 'Budget is required').refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Budget must be a positive number'),
  advertiser: z.string().min(1, 'Advertiser name is required').max(100, 'Advertiser name is too long'),
}).refine((data) => {
  if (data.type === 'video' && !data.videoUrl) {
    return false
  }
  if (data.type !== 'video' && !data.imageUrl) {
    return false
  }
  return true
}, {
  message: 'Image URL is required for non-video ads, Video URL is required for video ads',
  path: ['imageUrl'],
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return new Date(data.endDate) > new Date(data.startDate)
  }
  return true
}, {
  message: 'End date must be after start date',
  path: ['endDate'],
})

export type AddAdFormInput = z.infer<typeof addAdSchema>

export type AddAdFormData = {
  title: string
  description?: string
  type: 'banner' | 'sidebar' | 'popup' | 'video' | 'sponsored'
  status: 'active' | 'inactive' | 'pending' | 'expired'
  imageUrl?: string
  videoUrl?: string
  linkUrl: string
  startDate: string
  endDate: string
  budget: number
  advertiser: string
}
