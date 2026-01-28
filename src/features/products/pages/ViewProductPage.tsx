import { useParams, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { ArrowLeft, Edit, Package, DollarSign, Box, Tag, Ruler, Weight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { mockProducts } from '../data/mockProducts'
import { getStatusConfig } from '../components/ProductTableColumns'

export function ViewProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const product = useMemo(() => {
    return mockProducts.find((p) => p.id === id)
  }, [id])

  if (!product) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The product you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statusConfig = getStatusConfig(product.status)

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
            <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
              {product.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              Product Details & Information
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/products/edit/${product.id}`)}
          className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Product
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Description</label>
                <p className="mt-1 text-sm">{product.description}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Category</label>
                  <div className="mt-1">
                    <Badge variant="outline" className="bg-[#3BC1CF]/10 text-[#1974BB] border-[#3BC1CF]/20">
                      {product.category}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge className={`${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} border-2 font-semibold text-sm px-3 py-1`}>
                      {statusConfig.label}
                    </Badge>
                  </div>
                </div>
              </div>
              {product.tags && product.tags.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Tags</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Price</label>
                  <p className="mt-1 text-2xl font-bold text-[#1974BB] dark:text-[#3BC1CF]">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
                {product.compareAtPrice && (
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Compare At Price</label>
                    <p className="mt-1 text-xl font-semibold text-muted-foreground line-through">
                      ${product.compareAtPrice.toLocaleString()}
                    </p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Cost</label>
                  <p className="mt-1 text-lg font-semibold">
                    ${product.cost.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
                <Box className="w-5 h-5" />
                Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">SKU</label>
                  <p className="mt-1 font-mono text-sm">{product.sku}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Stock Quantity</label>
                  <p className={`mt-1 text-lg font-semibold ${product.stock < 10 ? 'text-red-600 dark:text-red-400' : ''}`}>
                    {product.stock.toLocaleString()}
                  </p>
                </div>
                {product.barcode && (
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Barcode</label>
                    <p className="mt-1 font-mono text-sm">{product.barcode}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Inventory Value</label>
                  <p className="mt-1 text-lg font-semibold text-[#1974BB] dark:text-[#3BC1CF]">
                    ${(product.price * product.stock).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Seller Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Seller</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Seller Name</label>
                <p className="mt-1 font-medium">{product.seller}</p>
              </div>
            </CardContent>
          </Card>

          {/* Physical Properties */}
          {(product.weight || product.dimensions) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  Physical Properties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {product.weight && (
                  <div className="flex items-center gap-2">
                    <Weight className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Weight</label>
                      <p className="text-sm">{product.weight} kg</p>
                    </div>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground">Dimensions</label>
                      <p className="text-sm">
                        {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Created</label>
                <p className="text-sm">
                  {new Date(product.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(product.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Last Updated</label>
                <p className="text-sm">
                  {new Date(product.updatedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(product.updatedAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
