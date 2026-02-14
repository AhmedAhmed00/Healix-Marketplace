import { useState, useMemo } from 'react'
import { subDays } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { DateRangeFilter } from '@/components/shared/DateRangeFilter'
import { salesData } from '../data/mockData'

const defaultTo = new Date('2026-01-15')
const defaultFrom = subDays(defaultTo, 14)

interface RevenueChartProps {
  city?: string
}

export function RevenueChart({ city }: RevenueChartProps) {
  const [from, setFrom] = useState<Date | undefined>(defaultFrom)
  const [to, setTo] = useState<Date | undefined>(defaultTo)

  const filteredData = useMemo(() => {
    let data = salesData
    if (city && city !== 'All') {
      data = data.filter((row) => row.city === city)
    } else if (city === 'All' || !city) {
      const byDate = new Map<string, { date: string; revenue: number; orders: number; averageOrderValue: number }>()
      salesData.forEach((row) => {
        const existing = byDate.get(row.date)
        if (!existing) {
          byDate.set(row.date, { ...row, revenue: row.revenue, orders: row.orders })
        } else {
          existing.revenue += row.revenue
          existing.orders += row.orders
        }
      })
      data = Array.from(byDate.values())
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((r) => ({
          ...r,
          averageOrderValue: r.orders ? r.revenue / r.orders : 0,
        })) as typeof salesData
    }
    if (!from && !to) return data
    return data.filter((row) => {
      const d = new Date(row.date)
      if (from && d < from) return false
      if (to && d > to) return false
      return true
    })
  }, [from, to, city])

  return (
    <Card className="border-t-4 border-t-[#3BC1CF]">
      <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <CardTitle className="text-lg md:text-xl text-[#1974BB] dark:text-[#3BC1CF]">Revenue Trend</CardTitle>
          <CardDescription className="text-xs md:text-sm">Daily revenue and orders over time</CardDescription>
        </div>
        <DateRangeFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={300} minHeight={250}>
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3BC1CF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3BC1CF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              className="dark:stroke-slate-400"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis
              stroke="#6b7280"
              className="dark:stroke-slate-400"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              labelStyle={{ color: '#1974BB', fontWeight: 600 }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3BC1CF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
