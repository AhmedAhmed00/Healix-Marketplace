import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import { CategoryStatsCards, categoryColumns } from './components'
import { mockCategories, calculateCategoryStats } from './data/mockCategories'
import { PageHeader } from '@/components/shared/page-header'
import { Folder, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddCategoryPage } from './pages/AddCategoryPage'
import { ViewCategoryPage } from './pages/ViewCategoryPage'

export default function CategoriesPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const stats = calculateCategoryStats(mockCategories)
  
  const isAddPage = location.pathname === '/categories/add'
  const isViewPage = location.pathname.includes('/categories/view/')

  return (
    <div>
      {!isAddPage && !isViewPage && (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <PageHeader
              title="Categories Management"
              description="Manage product categories and organize your marketplace"
              icon={Folder}
            />
            <Button
              onClick={() => navigate('/categories/add')}
              className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>

          {/* Stats Cards */}
          <CategoryStatsCards stats={stats} />

          {/* Categories Table */}
          <Card className="border-none bg-transparent shadow-none hover:shadow-none">
            <CardContent className="px-0">
              <DataTable columns={categoryColumns} data={mockCategories} />
            </CardContent>
          </Card>
        </div>
      )}

      <Routes>
        <Route path="add" element={<AddCategoryPage />} />
        <Route path="view/:id" element={<ViewCategoryPage />} />
      </Routes>
    </div>
  )
}
