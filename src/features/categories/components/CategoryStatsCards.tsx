import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { CategoryStats } from '../types'
import { Folder, CheckCircle, XCircle, Package } from 'lucide-react'

interface CategoryStatsCardsProps {
  stats: CategoryStats
}

export function CategoryStatsCards({ stats }: CategoryStatsCardsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Categories',
      value: stats.total.toLocaleString(),
      icon: Folder,
      colorVariant: 'primary',
    },
    {
      title: 'Active Categories',
      value: stats.active.toLocaleString(),
      icon: CheckCircle,
      colorVariant: 'success',
    },
    {
      title: 'Inactive Categories',
      value: stats.inactive.toLocaleString(),
      icon: XCircle,
      colorVariant: 'danger',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
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
