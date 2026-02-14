import { useState, useMemo } from 'react'
import { subMonths } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { DateRangeFilter } from '@/components/shared/DateRangeFilter'

const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'] as const
const cityScale: Record<string, number> = {
  'New York': 0.38,
  'Los Angeles': 0.28,
  Chicago: 0.2,
  Houston: 0.09,
  Phoenix: 0.05,
}

const revenueDataWithDatesBase = [
  { month: 'Jan', revenue: 45000, orders: 120, date: '2026-01-01' },
  { month: 'Feb', revenue: 52000, orders: 145, date: '2026-02-01' },
  { month: 'Mar', revenue: 48000, orders: 130, date: '2026-03-01' },
  { month: 'Apr', revenue: 61000, orders: 165, date: '2026-04-01' },
  { month: 'May', revenue: 55000, orders: 148, date: '2026-05-01' },
  { month: 'Jun', revenue: 67000, orders: 178, date: '2026-06-01' },
  { month: 'Jul', revenue: 72000, orders: 195, date: '2026-07-01' },
  { month: 'Aug', revenue: 68000, orders: 182, date: '2026-08-01' },
]

const revenueDataWithDates = revenueDataWithDatesBase.flatMap((row) =>
  CITIES.map((city) => ({
    ...row,
    city,
    revenue: Math.round(row.revenue * cityScale[city]),
    orders: Math.round(row.orders * cityScale[city]),
  }))
)

const defaultTo = new Date('2026-08-01')
const defaultFrom = subMonths(defaultTo, 7)

interface RevenueChartProps {
  city?: string
}

export function RevenueChart({ city }: RevenueChartProps) {
  const [from, setFrom] = useState<Date | undefined>(defaultFrom)
  const [to, setTo] = useState<Date | undefined>(defaultTo)

  const filteredData = useMemo(() => {
    let data = revenueDataWithDates
    if (city && city !== 'All') {
      data = data.filter((row) => row.city === city)
    } else if (city === 'All' || !city) {
      data = revenueDataWithDatesBase.map((row) => ({
        ...row,
        revenue: revenueDataWithDates
          .filter((r) => r.date === row.date)
          .reduce((sum, r) => sum + r.revenue, 0),
        orders: revenueDataWithDates
          .filter((r) => r.date === row.date)
          .reduce((sum, r) => sum + r.orders, 0),
      }))
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
    <Card className="">
      <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <CardTitle className="text-lg md:text-xl text-[#1974BB] dark:text-[#3BC1CF]">Revenue Overview</CardTitle>
          <CardDescription className="text-xs md:text-sm">Monthly revenue and order trends</CardDescription>
        </div>
        <DateRangeFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={350} minHeight={200}>
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3BC1CF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3BC1CF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              className="dark:stroke-slate-400"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#6b7280"
              className="dark:stroke-slate-400"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              labelStyle={{ color: '#1974BB', fontWeight: 600 }}
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

