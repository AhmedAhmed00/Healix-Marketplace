import { useParams, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { ArrowLeft, Edit, Package, DollarSign, Box, Tag, Building2, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { mockProducts } from '../data/mockProducts'

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
              Detailed breakdown of product specifications
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
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Image & Info */}
          <Card className="overflow-hidden">
            <div className="aspect-video w-full bg-muted relative">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
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
                  {product.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.description}
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
                  <Badge className={product.saleType === 'lease' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}>
                    {product.saleType.charAt(0).toUpperCase() + product.saleType.slice(1)}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">Price</span>
                  <span className="text-2xl font-bold text-[#1974BB] dark:text-[#3BC1CF]">
                    ${product.price.toLocaleString()}
                    {product.saleType === 'lease' && <span className="text-sm ml-1">/mo</span>}
                  </span>
                </div>
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
                  <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
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
                Brand Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Manufacturer / Brand</label>
                <p className="mt-1 text-lg font-semibold">{product.brand || 'No Brand Specified'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-[#1974BB] dark:text-[#3BC1CF]">
                <Calendar className="w-5 h-5" />
                History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Created At</label>
                <p className="text-sm font-medium mt-1">
                  {new Date(product.createdAt).toLocaleDateString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric'
                  })}
                </p>
              </div>
              <Separator />
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Updated</label>
                <p className="text-sm font-medium mt-1">
                  {new Date(product.updatedAt).toLocaleDateString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric'
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
