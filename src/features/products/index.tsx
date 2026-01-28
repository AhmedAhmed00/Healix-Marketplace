import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import { ProductStatsCards, productColumns } from './components'
import { mockProducts, calculateProductStats } from './data/mockProducts'
import { PageHeader } from '@/components/shared/page-header'
import { Package, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddProductPage } from './pages/AddProductPage'
import { ViewProductPage } from './pages/ViewProductPage'

export default function ProductsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const stats = calculateProductStats(mockProducts)

  const isAddPage = location.pathname === '/products/add'
  const isViewPage = location.pathname.includes('/products/view/')

  return (
    <div>
      {!isAddPage && !isViewPage && (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <PageHeader
              title="Products Management"
              description="Manage your marketplace products, inventory, and pricing"
              icon={Package}
            />
            <Button
              onClick={() => navigate('/products/add')}
              className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Stats Cards */}
          <ProductStatsCards stats={stats} />

          {/* Products Table */}
          <Card className="border-none bg-transparent shadow-none hover:shadow-none">
            <CardContent className="px-0">
              <DataTable columns={productColumns} data={mockProducts} />
            </CardContent>
          </Card>
        </div>
      )}

      <Routes>
        <Route path="add" element={<AddProductPage />} />
        <Route path="view/:id" element={<ViewProductPage />} />
      </Routes>
    </div>
  )
}
