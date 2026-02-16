import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { ApiProductStats } from '../types'
import { Package, CheckCircle, AlertCircle, DollarSign } from 'lucide-react'

interface ProductStatsCardsProps {
  stats?: ApiProductStats
  isLoading?: boolean
}

export function ProductStatsCards({ stats, isLoading }: ProductStatsCardsProps) {
  // Default values when stats are not available
  const totalProducts = stats?.total_products ?? 0
  const activeProducts = stats?.active_products ?? 0
  const outOfStock = stats?.out_of_stock ?? 0
  const totalInventoryValue = stats?.total_inventory_value ? parseFloat(stats.total_inventory_value) : 0

  const cards: StatsCardProps[] = [
    {
      title: 'Total Products',
      value: totalProducts.toLocaleString(),
      icon: Package,
      colorVariant: 'primary',
    },
    {
      title: 'Active Products',
      value: activeProducts.toLocaleString(),
      icon: CheckCircle,
      colorVariant: 'primary',
    },
    {
      title: 'Out of Stock',
      value: outOfStock.toLocaleString(),
      icon: AlertCircle,
      colorVariant: 'primary',
    },
    {
      title: 'Total Inventory Value',
      value: `$${totalInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      colorVariant: 'primary',
    },
  ]

  return (
    <StatsCardGrid
      cards={cards}
      columns={{ default: 1, sm: 2, lg: 4 }}
    />
  )
}
