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
      colorVariant: 'success',
    },
    {
      title: 'Total Budget',
      value: `$${stats.totalBudget.toLocaleString()}`,
      icon: DollarSign,
      colorVariant: 'secondary',
    },
    {
      title: 'Total Spent',
      value: `$${stats.totalSpent.toLocaleString()}`,
      icon: DollarSign,
      colorVariant: 'warning',
    },
    {
      title: 'Total Impressions',
      value: stats.totalImpressions.toLocaleString(),
      icon: Eye,
      colorVariant: 'info',
    },
    {
      title: 'Total Clicks',
      value: stats.totalClicks.toLocaleString(),
      icon: MousePointerClick,
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
