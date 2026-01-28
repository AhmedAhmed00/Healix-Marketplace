import { DashboardStats as Stats } from '../types'
import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from 'lucide-react'

interface DashboardStatsProps {
  stats: Stats
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Earnings',
      value: `$${stats.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      colorVariant: 'primary',
      trend: {
        value: stats.earningsChange,
        label: 'vs last month',
        isPositive: stats.earningsChange >= 0,
      },
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      colorVariant: 'primary',
      trend: {
        value: stats.ordersChange,
        label: 'vs last month',
        isPositive: stats.ordersChange >= 0,
      },
    },
    {
      title: 'Total Clients',
      value: stats.totalClients.toLocaleString(),
      icon: Users,
      colorVariant: 'primary',
      trend: {
        value: stats.clientsChange,
        label: 'new this month',
        isPositive: stats.clientsChange >= 0,
      },
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      colorVariant: 'primary',
      trend: {
        value: stats.productsChange,
        label: 'vs last month',
        isPositive: stats.productsChange >= 0,
      },
    },
  ]

  return (
    <StatsCardGrid
      cards={cards}
      columns={{ default: 1, sm: 2, lg: 4 }}
    />
  )
}

