import { StatsCard } from './StatsCard'
import { StatsCardGridProps } from './types'
import { cn } from '@/lib/utils'

export function StatsCardGrid({
  cards,
  columns = { default: 1, md: 2, lg: 5 }
}: StatsCardGridProps) {
  const gridClasses = cn(
    'grid gap-4',
    columns.default && `grid-cols-${columns.default}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg} `,
    columns.xl && `xl:grid-cols-${columns.xl}`
  )

  return (
    <div className={gridClasses}>
      {cards.map((card, index) => (
        <StatsCard key={index} {...card} />
      ))}
    </div>
  )
}

