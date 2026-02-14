import { useState, useMemo } from 'react'
import { subDays } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { DateRangeFilter } from '@/components/shared/DateRangeFilter'
import { salesByCategory } from '../data/mockData'

const COLORS = ['#3BC1CF', '#1974BB', '#60a5fa', '#38bdf8', '#0ea5e9', '#94a3b8']

const defaultTo = new Date('2026-01-15')
const defaultFrom = subDays(defaultTo, 14)

interface SalesByCategoryChartProps {
  city?: string
}

export function SalesByCategoryChart({ city }: SalesByCategoryChartProps) {
  const [from, setFrom] = useState<Date | undefined>(defaultFrom)
  const [to, setTo] = useState<Date | undefined>(defaultTo)

  const chartData = useMemo(() => {
    if (city && city !== 'All') {
      return salesByCategory.filter((row) => row.city === city)
    }
    const byCategory = new Map<string, { category: string; revenue: number; orders: number }>()
    salesByCategory.forEach((row) => {
      const existing = byCategory.get(row.category)
      if (!existing) {
        byCategory.set(row.category, { category: row.category, revenue: row.revenue, orders: row.orders })
      } else {
        existing.revenue += row.revenue
        existing.orders += row.orders
      }
    })
    const total = Array.from(byCategory.values()).reduce((s, r) => s + r.revenue, 0)
    return Array.from(byCategory.values()).map((r) => ({
      ...r,
      percentage: total ? (r.revenue / total) * 100 : 0,
    }))
  }, [city])

  return (
    <Card className="border-t-4 border-t-[#1974BB]">
      <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Sales by Category</CardTitle>
          <CardDescription>Revenue distribution across product categories</CardDescription>
        </div>
        <DateRangeFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(props: { category?: string; percent?: number }) => {
                const { category, percent } = props
                return category ? `${category}: ${(percent ? percent * 100 : 0).toFixed(0)}%` : ''
              }}
              outerRadius={100}
              fill="#8884d8"
              dataKey="revenue"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            />

          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
