import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { useAddProductForm } from '../hooks/use-add-product-form'
import { BasicInfoSection } from '../components/form-sections/BasicInfoSection'
import { PricingSection } from '../components/form-sections/PricingSection'
import { InventorySection } from '../components/form-sections/InventorySection'

export function AddProductPage() {
  const navigate = useNavigate()
  const { form, handleSubmit, isSubmitting } = useAddProductForm()

  return (
    <div className="space-y-6  mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/products')}
          className="hover:bg-[#3BC1CF]/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
            Add New Product
          </h1>
          <p className="text-muted-foreground mt-2">
            Create a new product listing for your marketplace
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Product Information</CardTitle>
          <CardDescription>
            Fill in the details to add a new product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-10">
              <BasicInfoSection form={form} />

              <div className="border-t pt-8">
                <PricingSection form={form} />
              </div>

              <div className="border-t pt-8">
                <InventorySection form={form} />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-8 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/products')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90 min-w-[120px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding Product...' : 'Add Product'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
