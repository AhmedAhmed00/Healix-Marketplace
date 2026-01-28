import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import { AdStatsCards, adColumns } from './components'
import { mockAds, calculateAdStats } from './data/mockAds'
import { PageHeader } from '@/components/shared/page-header'
import { Megaphone, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AddAdPage } from './pages/AddAdPage'
import { ViewAdPage } from './pages/ViewAdPage'

export default function AdsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const stats = calculateAdStats(mockAds)
  
  const isAddPage = location.pathname === '/ads/add'
  const isViewPage = location.pathname.includes('/ads/view/')

  return (
    <div>
      {!isAddPage && !isViewPage && (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <PageHeader
              title="Ads Management"
              description="Manage advertisements, campaigns, and performance metrics"
              icon={Megaphone}
            />
            <Button
              onClick={() => navigate('/ads/add')}
              className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Ad
            </Button>
          </div>

          {/* Stats Cards */}
          <AdStatsCards stats={stats} />

          {/* Ads Table */}
          <Card className="border-none bg-transparent shadow-none hover:shadow-none">
            <CardContent className="px-0">
              <DataTable columns={adColumns} data={mockAds} />
            </CardContent>
          </Card>
        </div>
      )}

      <Routes>
        <Route path="add" element={<AddAdPage />} />
        <Route path="view/:id" element={<ViewAdPage />} />
      </Routes>
    </div>
  )
}
