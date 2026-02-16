import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Package, DollarSign, Box, Tag, Building2, Calendar, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useProduct } from '../hooks/use-products'
import FullPageLoading from '@/components/ui/full-page-loading'

// You might want to move this to a separate file
const formatCurrency = (amount: string | number) => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numAmount)
}

const getCategoryName = (categoryId: number) => {
  // This should be replaced with actual category mapping from your backend
  const categories: Record<number, string> = {
    1: 'Electronics',
    2: 'Clothing',
    3: 'Furniture',
    4: 'Books',
    // Add more categories as needed
  }
  return categories[categoryId] || `Category #${categoryId}`
}

export function ViewProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: product, isLoading, isError } = useProduct(id!)

  if (isLoading) {
    return (
      <FullPageLoading resource='Product' />
    )
  }

  if (isError || !product) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Error Loading Product</h2>
            <p className="text-muted-foreground mb-4">
              {isError ? 'Failed to load product details.' : 'Product not found.'}
            </p>
            <Button onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }


  const salePrice = parseFloat(product.price)
  const leasePrice = product.lease_price ? parseFloat(product.lease_price) : null
  const insurancePrice = product.insurance_price ? parseFloat(product.insurance_price) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
              {product.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              Product ID: {product.id} • {product.is_active ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/products/add?mode=update&product_id=${product.id}`)}
          className="bg-linear-to-r from-[#1974BB] to-[#3BC1CF] text-white hover:opacity-90"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Product
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Image & Info */}
          <Card className="overflow-hidden">
            <div className="aspect-video w-full bg-muted relative">
              {product.main_image ? (
                <img
                  src={product.main_image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.png' // Add a placeholder
                  }}
                />
              ) : product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.png'
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Package className="w-12 h-12 opacity-20" />
                </div>
              )}
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-[#1974BB] dark:text-[#3BC1CF]">Description</CardTitle>
                <Badge variant="outline" className="bg-[#3BC1CF]/10 text-[#1974BB] border-[#3BC1CF]/20">
                  {getCategoryName(product.category)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.description || 'No description provided.'}
              </p>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-[#1974BB] dark:text-[#3BC1CF]">
                  <DollarSign className="w-5 h-5" />
                  Pricing & Sale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">Sale Type</span>
                  <Badge className={
                    product.sale_type === 'lease'
                      ? 'bg-purple-100 text-purple-700 border-purple-200'
                      : product.sale_type === 'both'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-blue-100 text-blue-700 border-blue-200'
                  }>
                    {product.sale_type.charAt(0).toUpperCase() + product.sale_type.slice(1)}
                  </Badge>
                </div>
                <Separator />

                {(product.sale_type === 'sale' || product.sale_type === 'both') && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground font-medium">Sale Price</span>
                      <span className="text-2xl font-bold text-[#1974BB] dark:text-[#3BC1CF]">
                        {formatCurrency(salePrice)}
                      </span>
                    </div>
                  </div>
                )}

                {(product.sale_type === 'lease' || product.sale_type === 'both') && leasePrice && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground font-medium">Lease Price</span>
                      <span className="text-xl font-semibold">
                        {formatCurrency(leasePrice)}
                        <span className="text-sm text-muted-foreground ml-1">
                          /{product.lease_period || 'month'}
                        </span>
                      </span>
                    </div>
                    {insurancePrice && insurancePrice > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Insurance</span>
                        <span>{formatCurrency(insurancePrice)}/mo</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-[#1974BB] dark:text-[#3BC1CF]">
                  <Box className="w-5 h-5" />
                  Inventory
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">Stock Status</span>
                  <Badge
                    variant={product.stock > 0 ? (product.stock < 10 ? 'warning' : 'default') : 'destructive'}
                    className={product.stock > 0 && product.stock < 10 ? 'bg-orange-100 text-orange-700 border-orange-200' : ''}
                  >
                    {product.stock === 0
                      ? 'Out of Stock'
                      : product.stock < 10
                        ? 'Low Stock'
                        : 'In Stock'}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">Current Quantity</span>
                  <span className="text-2xl font-bold">{product.stock.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-[#1974BB] dark:text-[#3BC1CF]">
                <Building2 className="w-5 h-5" />
                Brand & Vendor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Brand
                </label>
                <p className="mt-1 text-lg font-semibold">
                  {product.brand || 'No Brand Specified'}
                </p>
              </div>
              <Separator />
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Vendor ID
                </label>
                <p className="mt-1 text-sm font-medium">
                  #{product.vendor}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-[#1974BB] dark:text-[#3BC1CF]">
                <Tag className="w-5 h-5" />
                Category Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Category ID
                </label>
                <p className="mt-1 text-lg font-semibold">
                  {product.category}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {getCategoryName(product.category)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-[#1974BB] dark:text-[#3BC1CF]">
                <Calendar className="w-5 h-5" />
                Additional Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              {product.images && product.images.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-md overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => window.open(image, '_blank')}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No additional images
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}