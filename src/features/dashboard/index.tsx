import { useState, useMemo } from 'react'
import {
  DashboardStats,
  UpcomingAppointments,
  ConfirmedAppointments,
  RevenueChart,
  OrderStatusesChart,
  MostPaidOrdersChart
} from './components'
import {
  dashboardStats,
  dashboardStatsByCity,
  upcomingOrders,
  confirmedOrders,
  OVERVIEW_CITIES,
  type OverviewCity
} from './data/mockData'
import { OverviewTab } from '@/features/sales-analytics/components'
import { salesMetrics, salesMetricsByCity } from '@/features/sales-analytics/data/mockData'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MapPin } from 'lucide-react'

export function DashboardPage() {
  const [city, setCity] = useState<OverviewCity>('All')

  const stats = useMemo(
    () => (city === 'All' ? dashboardStats : dashboardStatsByCity[city] ?? dashboardStats),
    [city]
  )

  const salesMetricsFiltered = useMemo(
    () => (city === 'All' ? salesMetrics : salesMetricsByCity[city] ?? salesMetrics),
    [city]
  )

  const upcomingFiltered = useMemo(
    () =>
      city === 'All'
        ? upcomingOrders
        : upcomingOrders.filter((o) => o.city === city),
    [city]
  )

  const confirmedFiltered = useMemo(
    () =>
      city === 'All'
        ? confirmedOrders
        : confirmedOrders.filter((o) => o.city === city),
    [city]
  )

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header + City filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
            Welcome back! Here's what's happening with your marketplace today.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 min-w-[180px]">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <Label htmlFor="overview-city" className="text-sm font-medium shrink-0">
              Select City
            </Label>
          </div>
          <Select value={city} onValueChange={(v) => setCity(v as OverviewCity)}>
            <SelectTrigger id="overview-city" className="w-[180px]">
              <SelectValue placeholder="All cities" />
            </SelectTrigger>
            <SelectContent>
              {OVERVIEW_CITIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      {/* Charts Section - Top Row */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <RevenueChart city={city} />
        <OrderStatusesChart city={city} />
      </div>

      {/* Charts Section - Bottom Row */}
      <div className="grid gap-4 md:gap-6 grid-cols-1">
        <MostPaidOrdersChart city={city} />
      </div>

      {/* Sales Analytics Section */}
      <div className="space-y-4 md:space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Sales Analytics
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Revenue trends, orders, and category performance.
          </p>
        </div>
        <OverviewTab metrics={salesMetricsFiltered} city={city} showStatsCards={false} />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UpcomingAppointments appointments={upcomingFiltered} />
        </div>
        <div className="lg:col-span-1">
          <ConfirmedAppointments appointments={confirmedFiltered} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

