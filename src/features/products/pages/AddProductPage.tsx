import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

import { BasicInfoSection } from '../components/form-sections/BasicInfoSection'
import { PricingSection } from '../components/form-sections/PricingSection'
import { InventorySection } from '../components/form-sections/InventorySection'
import { useProductForm } from '../hooks/use-product-form'
import { useProduct } from '../hooks/use-product'

export function AddProductPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Detect mode from search params
  const mode = searchParams.get('mode') === 'update' ? 'update' : 'create'
  const productId = searchParams.get('product_id')

  // Fetch product data if in edit mode
  const { data: product, isLoading, isError: isFetchError } = useProduct(
    mode === 'update' ? productId : null
  )

  // Initialize form with mode and product data
  const { form, handleSubmit, isSubmitting, isError } = useProductForm({
    mode,
    productId: productId || undefined,
    initialData: product,
  })

  // Show loading state while fetching product data
  if (mode === 'update' && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#3BC1CF]" />
          <p className="text-muted-foreground">Loading product data...</p>
        </div>
      </div>
    )
  }

  // Show error if product fetch failed
  if (mode === 'update' && isFetchError) {
    return (
      <div className="space-y-6 mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load product data. Please try again or go back to the products list.
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/products')} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </div>
    )
  }

  const isEditMode = mode === 'update'

  return (
    <div className="space-y-6 mx-auto">
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
          <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-[#1974BB] to-[#3BC1CF] bg-clip-text text-transparent">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isEditMode
              ? 'Update product information and details'
              : 'Create a new product listing for your marketplace'}
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {isError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to {isEditMode ? 'update' : 'create'} product. Please check the form for errors and try again.
          </AlertDescription>
        </Alert>
      )}

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Product Information</CardTitle>
          <CardDescription>
            {isEditMode
              ? 'Modify the product details below. Only changed fields will be updated.'
              : 'Fill in the details to add a new product'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-10">
              <BasicInfoSection
                form={form}
                isEditMode={isEditMode}
                existingMainImage={product?.main_image}
                existingImages={product?.images}
              />

              <div className="border-t pt-8">
                <PricingSection product={product} form={form} />
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
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-linear-to-r from-[#1974BB] to-[#3BC1CF] text-white hover:opacity-90 min-w-[120px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? (isEditMode ? 'Updating...' : 'Adding...')
                    : (isEditMode ? 'Update Product' : 'Add Product')}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}