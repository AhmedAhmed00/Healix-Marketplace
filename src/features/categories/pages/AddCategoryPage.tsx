import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { addCategorySchema, type AddCategoryFormInput, categoryStatuses } from '../schemas/category-schema'

export function AddCategoryPage() {
  const navigate = useNavigate()

  const form = useForm<AddCategoryFormInput>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      status: 'active',
      icon: '',
    },
  })

  // Auto-generate slug from name
  const handleNameChange = (value: string) => {
    form.setValue('name', value)
    const slug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    form.setValue('slug', slug)
  }

  const handleSubmit = (data: AddCategoryFormInput) => {
    console.log('New category data:', data)
    // TODO: Add category to the database/state
    // After successful creation, navigate back to categories list
    navigate('/categories')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/categories')}
          className="hover:bg-[#3BC1CF]/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
            Add New Category
          </h1>
          <p className="text-muted-foreground mt-2">
            Create a new product category for your marketplace
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Category Information</CardTitle>
          <CardDescription>
            Fill in all the required details to add a new category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Category Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Category Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Electronics"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleNameChange(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Slug *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., electronics"
                        className="focus-visible:ring-[#3BC1CF] font-mono"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      URL-friendly identifier (auto-generated from name)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe this category..."
                        className="focus-visible:ring-[#3BC1CF] min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Status *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-[#3BC1CF]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Icon */}
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Icon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 💻 or 📱"
                          className="focus-visible:ring-[#3BC1CF] text-2xl"
                          maxLength={10}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Optional emoji or icon for the category
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/categories')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Adding Category...' : 'Add Category'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
