import { useParams, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { ArrowLeft, Edit, Folder, Package, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { mockCategories } from '../data/mockCategories'
import { getStatusConfig } from '../components/CategoryTableColumns'

export function ViewCategoryPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const category = useMemo(() => {
    return mockCategories.find((c) => c.id === id)
  }, [id])

  if (!category) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Folder className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Category Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The category you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/categories')}>
              Back to Categories
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const statusConfig = getStatusConfig(category.status)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/categories')}
            className="hover:bg-[#3BC1CF]/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            {category.icon && (
              <span className="text-4xl">{category.icon}</span>
            )}
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
                {category.name}
              </h1>
              <p className="text-muted-foreground mt-2">
                Category Details & Information
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/categories/edit/${category.id}`)}
          className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Category
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Category Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.description && (
                <>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Description</label>
                    <p className="mt-1 text-sm">{category.description}</p>
                  </div>
                  <Separator />
                </>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Slug</label>
                  <p className="mt-1 font-mono text-sm">{category.slug}</p>
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
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
                <Package className="w-5 h-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground">Total Products</label>
                    <p className="mt-1 text-3xl font-bold text-[#1974BB] dark:text-[#3BC1CF]">
                      {category.productCount.toLocaleString()}
                    </p>
                  </div>
                  <Package className="w-8 h-8 text-[#1974BB] dark:text-[#3BC1CF] opacity-50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF] flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Created</label>
                <p className="text-sm">
                  {new Date(category.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(category.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <Separator />
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Last Updated</label>
                <p className="text-sm">
                  {new Date(category.updatedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(category.updatedAt).toLocaleTimeString('en-US', {
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
