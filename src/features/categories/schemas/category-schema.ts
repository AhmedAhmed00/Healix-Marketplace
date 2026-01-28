import { z } from 'zod'

export const categoryStatuses = ['active', 'inactive'] as const

export const addCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Category name is too long'),
  description: z.string().max(500, 'Description is too long').optional(),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  status: z.enum(categoryStatuses, {
    required_error: 'Status is required',
  }),
  icon: z.string().max(10, 'Icon must be a single emoji or short text').optional(),
})

export type AddCategoryFormInput = z.infer<typeof addCategorySchema>

export type AddCategoryFormData = {
  name: string
  description?: string
  slug: string
  status: 'active' | 'inactive'
  icon?: string
}
