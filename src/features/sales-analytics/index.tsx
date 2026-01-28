import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OverviewTab, ProductsTab, RegionsTab } from './components'
import { salesMetrics, topProducts, salesByRegion } from './data/mockData'
import { BarChart3, Package, Globe } from 'lucide-react'

export function SalesAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
          Sales Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Track your sales performance, revenue trends, and product analytics.
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="justify-start h-auto p-1 bg-transparent rounded-xl flex-1 flex-wrap gap-2">
          <TabsTrigger
            value="overview"
            className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Products</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="regions"
            className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Regions</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab metrics={salesMetrics} />
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <ProductsTab products={topProducts} />
        </TabsContent>

        <TabsContent value="regions" className="space-y-6">
          <RegionsTab regions={salesByRegion} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SalesAnalyticsPage
