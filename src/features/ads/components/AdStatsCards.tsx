import { StatsCardGrid, StatsCardProps } from '@/components/shared/stats'
import { AdStats } from '../types'
import { Megaphone, CheckCircle, DollarSign, Eye, MousePointerClick } from 'lucide-react'

interface AdStatsCardsProps {
  stats: AdStats
}

export function AdStatsCards({ stats }: AdStatsCardsProps) {
  const cards: StatsCardProps[] = [
    {
      title: 'Total Ads',
      value: stats.total.toLocaleString(),
      icon: Megaphone,
      colorVariant: 'primary',
    },
    {
      title: 'Active Ads',
      value: stats.active.toLocaleString(),
      icon: CheckCircle,
      colorVariant: 'primary',
    },
    {
      title: 'Total Budget',
      value: `$${stats.totalBudget.toLocaleString()}`,
      icon: DollarSign,
      colorVariant: 'primary',
    },

  ]

  return (
    <StatsCardGrid
      cards={cards}
      columns={{ default: 1, sm: 2, lg: 3 }}
    />
  )
}
