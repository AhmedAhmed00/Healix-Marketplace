import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { ProductStats } from '../types'
import { Package, CheckCircle, XCircle, AlertCircle, DollarSign } from 'lucide-react'

interface ProductStatsCardsProps {
  stats: ProductStats
}

export function ProductStatsCards({ stats }: ProductStatsCardsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Products',
      value: stats.total.toLocaleString(),
      icon: Package,
      colorVariant: 'primary',
    },
    {
      title: 'Active Products',
      value: stats.active.toLocaleString(),
      icon: CheckCircle,
      colorVariant: 'success',
    },
    {
      title: 'Out of Stock',
      value: stats.outOfStock.toLocaleString(),
      icon: AlertCircle,
      colorVariant: 'danger',
    },
    {
      title: 'Total Inventory Value',
      value: `$${stats.totalValue.toLocaleString()}`,
      icon: DollarSign,
      colorVariant: 'secondary',
    },
  ]

  return (
    <StatsCardGrid 
      cards={cards} 
      columns={{ default: 1, sm: 2, lg: 4 }} 
    />
  )
}
