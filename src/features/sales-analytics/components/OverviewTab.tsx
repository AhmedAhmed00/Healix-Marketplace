import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { SalesMetrics } from '../types'
import { DollarSign, ShoppingCart, TrendingUp, Target } from 'lucide-react'
import { RevenueChart } from './RevenueChart'
import { SalesByCategoryChart } from './SalesByCategoryChart'

interface OverviewTabProps {
  metrics: SalesMetrics
}

export function OverviewTab({ metrics }: OverviewTabProps) {
  const statsCards: StatsCardProps[] = [
    {
      title: 'Total Revenue',
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      colorVariant: 'primary',
      trend: {
        value: metrics.revenueChange,
        label: 'vs last month',
        isPositive: metrics.revenueChange >= 0,
      },
    },
    {
      title: 'Total Orders',
      value: metrics.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      colorVariant: 'secondary',
      trend: {
        value: metrics.ordersChange,
        label: 'vs last month',
        isPositive: metrics.ordersChange >= 0,
      },
    },
    {
      title: 'Average Order Value',
      value: `$${metrics.averageOrderValue.toFixed(2)}`,
      icon: TrendingUp,
      colorVariant: 'success',
      description: 'Per order average',
    },
    {
      title: 'Conversion Rate',
      value: `${metrics.conversionRate}%`,
      icon: Target,
      colorVariant: 'info',
      description: 'Visitor to order rate',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCardGrid 
        cards={statsCards} 
        columns={{ default: 1, sm: 2, lg: 4 }} 
      />

      {/* Charts */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <RevenueChart />
        <SalesByCategoryChart />
      </div>
    </div>
  )
}
