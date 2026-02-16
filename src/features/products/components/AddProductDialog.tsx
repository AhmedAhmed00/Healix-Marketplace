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
import { addProductSchema, type AddProductFormData, type AddProductFormInput, saleTypes } from '../schemas/product-schema'
import { InfiniteSelect } from '@/components/shared/selectors/infinite-select'
import { fetchCategories } from '../api/product-api'

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
      brand: '',
      sale_type: 'sale',
      price: '',
      stock: '',
      lease_period: undefined,
      lease_price: '',
      insurance_price: '',
      is_active: true,
      main_image: undefined,
      images: [],
    },
  })

  const saleType = form.watch('sale_type')
  const showLeaseFields = saleType === 'lease' || saleType === 'both'

  const handleSubmit = (data: AddProductFormInput) => {
    const transformedData: AddProductFormData = {
      name: data.name,
      description: data.description,
      category: data.category,
      brand: data.brand || undefined,
      sale_type: data.sale_type,
      price: data.price,
      stock: data.stock,
      lease_period: data.lease_period,
      lease_price: data.lease_price,
      insurance_price: data.insurance_price,
      is_active: data.is_active,
      main_image: data.main_image,
      images: data.images,
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
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm font-semibold">Category *</FormLabel>
                    <FormControl>
                      <InfiniteSelect
                        fetchFunction={fetchCategories}
                        placeholder="Select category"
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Brand */}
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Brand (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Sony, Apple"
                        className="focus-visible:ring-[#3BC1CF]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Sale Type */}
            <FormField
              control={form.control}
              name="sale_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Sale Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="focus:ring-[#3BC1CF]">
                        <SelectValue placeholder="Select sale type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {saleTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type === 'sale' ? 'Sale Only' : type === 'lease' ? 'Lease Only' : 'Both Sale & Lease'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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

            {/* Lease Fields - Conditional */}
            {showLeaseFields && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                <h4 className="text-sm font-semibold">Lease Information</h4>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="lease_period"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Period *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value ?? ''}>
                          <FormControl>
                            <SelectTrigger className="focus:ring-[#3BC1CF]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lease_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Lease Price *</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="insurance_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Insurance *</FormLabel>
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
              </div>
            )}

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
