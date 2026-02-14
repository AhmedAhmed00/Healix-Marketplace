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
import { addProductSchema, type AddProductFormData, type AddProductFormInput, productCategories } from '../schemas/product-schema'
import { PricingSection } from './form-sections/PricingSection'

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
      lease: false,
      outrightSale: true,
      leasePeriod: undefined,
      leasePrice: '',
      insurancePrice: '',
      price: '',
      stock: '',
    },
  })

  const handleSubmit = (data: AddProductFormInput) => {
    const transformedData: AddProductFormData = {
      name: data.name,
      description: data.description,
      category: data.category,
      brand: data.brand || undefined,
      lease: data.lease,
      outrightSale: data.outrightSale,
      leasePeriod: data.leasePeriod,
      leasePrice: data.leasePrice ? Number(data.leasePrice) : undefined,
      insurancePrice: data.insurancePrice ? Number(data.insurancePrice) : undefined,
      price: data.price ? Number(data.price) : undefined,
      stock: Number(data.stock),
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
                    <FormLabel className="text-sm font-semibold">Category*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-[#3BC1CF] shadow-none!">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productCategories.map((category) => (
                          <SelectItem className="shadow-none!" key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

            <PricingSection form={form} />

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
