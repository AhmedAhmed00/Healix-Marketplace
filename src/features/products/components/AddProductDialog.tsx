import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { addProductSchema, type AddProductFormData, type AddProductFormInput, productCategories, productStatuses } from '../schemas/product-schema'

interface AddProductDialogProps {
  onSubmit: (data: AddProductFormData) => void
}

export function AddProductDialog({ onSubmit }: AddProductDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<AddProductFormInput>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: '',
      description: '',
      category: undefined,
      price: '',
      compareAtPrice: '',
      cost: '',
      sku: '',
      barcode: '',
      stock: '',
      status: 'draft',
      tags: '',
      weight: '',
      length: '',
      width: '',
      height: '',
    },
  })

  const handleSubmit = (data: AddProductFormInput) => {
    const transformedData: AddProductFormData = {
      name: data.name,
      description: data.description,
      category: data.category,
      price: Number(data.price),
      compareAtPrice: data.compareAtPrice ? Number(data.compareAtPrice) : undefined,
      cost: Number(data.cost),
      sku: data.sku,
      barcode: data.barcode || undefined,
      stock: Number(data.stock),
      status: data.status,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : undefined,
      weight: data.weight ? Number(data.weight) : undefined,
      dimensions: data.length && data.width && data.height ? {
        length: Number(data.length),
        width: Number(data.width),
        height: Number(data.height),
      } : undefined,
    }
    onSubmit(transformedData)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1974BB] dark:text-[#3BC1CF]">
            Add New Product
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in the details below to create a new product listing
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
            {/* Product Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Product Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Premium Electronics Bundle"
                      className="focus-visible:ring-[#3BC1CF]"
                      {...field}
                    />
                  </FormControl>
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
                  <FormLabel className="text-sm font-semibold">Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your product..."
                      className="focus-visible:ring-[#3BC1CF] min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Category *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-[#3BC1CF]">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        {productStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Price ($) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Compare At Price */}
              <FormField
                control={form.control}
                name="compareAtPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Compare At Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cost */}
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Cost ($) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* SKU */}
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">SKU *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., PROD-001"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Stock */}
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Stock Quantity *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        step="1"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Barcode */}
            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Barcode</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Optional barcode"
                      className="focus-visible:ring-[#3BC1CF]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., electronics, premium, bundle (comma-separated)"
                      className="focus-visible:ring-[#3BC1CF]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Separate tags with commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weight and Dimensions */}
            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Weight (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.0"
                        min="0"
                        step="0.1"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Length (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Width (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Height (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  setOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Adding...' : 'Add Product'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
