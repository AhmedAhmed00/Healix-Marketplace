import { useState, useMemo } from 'react'
import { subDays } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { DateRangeFilter } from '@/components/shared/DateRangeFilter'

const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'] as const
const cityScale: Record<string, number> = {
  'New York': 0.38,
  'Los Angeles': 0.28,
  Chicago: 0.2,
  Houston: 0.09,
  Phoenix: 0.05,
}

const orderStatusDataBase = [
  { day: 'Mon', confirmed: 32, pending: 8, processing: 12, shipped: 15, delivered: 28, cancelled: 3, date: '2026-01-20' },
  { day: 'Tue', confirmed: 28, pending: 12, processing: 10, shipped: 18, delivered: 25, cancelled: 2, date: '2026-01-21' },
  { day: 'Wed', confirmed: 35, pending: 6, processing: 14, shipped: 20, delivered: 30, cancelled: 4, date: '2026-01-22' },
  { day: 'Thu', confirmed: 40, pending: 10, processing: 16, shipped: 22, delivered: 35, cancelled: 1, date: '2026-01-23' },
  { day: 'Fri', confirmed: 38, pending: 9, processing: 15, shipped: 19, delivered: 32, cancelled: 5, date: '2026-01-24' },
  { day: 'Sat', confirmed: 25, pending: 5, processing: 8, shipped: 12, delivered: 20, cancelled: 2, date: '2026-01-25' },
  { day: 'Sun', confirmed: 18, pending: 3, processing: 6, shipped: 10, delivered: 15, cancelled: 1, date: '2026-01-26' },
]

const orderStatusDataWithDates = orderStatusDataBase.flatMap((row) =>
  CITIES.map((city) => ({
    ...row,
    city,
    confirmed: Math.round(row.confirmed * cityScale[city]),
    pending: Math.round(row.pending * cityScale[city]),
    processing: Math.round(row.processing * cityScale[city]),
    shipped: Math.round(row.shipped * cityScale[city]),
    delivered: Math.round(row.delivered * cityScale[city]),
    cancelled: Math.round(row.cancelled * cityScale[city]),
  }))
)

const defaultTo = new Date('2026-01-26')
const defaultFrom = subDays(defaultTo, 6)

interface OrderStatusesChartProps {
  city?: string
}

export function OrderStatusesChart({ city }: OrderStatusesChartProps) {
  const [from, setFrom] = useState<Date | undefined>(defaultFrom)
  const [to, setTo] = useState<Date | undefined>(defaultTo)

  const filteredData = useMemo(() => {
    let data: typeof orderStatusDataBase
    if (city && city !== 'All') {
      data = orderStatusDataWithDates
        .filter((row) => row.city === city)
        .map(({ city: _c, ...row }) => row)
    } else {
      data = orderStatusDataBase.map((row) => ({
        ...row,
        confirmed: orderStatusDataWithDates.filter((r) => r.date === row.date).reduce((s, r) => s + r.confirmed, 0),
        pending: orderStatusDataWithDates.filter((r) => r.date === row.date).reduce((s, r) => s + r.pending, 0),
        processing: orderStatusDataWithDates.filter((r) => r.date === row.date).reduce((s, r) => s + r.processing, 0),
        shipped: orderStatusDataWithDates.filter((r) => r.date === row.date).reduce((s, r) => s + r.shipped, 0),
        delivered: orderStatusDataWithDates.filter((r) => r.date === row.date).reduce((s, r) => s + r.delivered, 0),
        cancelled: orderStatusDataWithDates.filter((r) => r.date === row.date).reduce((s, r) => s + r.cancelled, 0),
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
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Order Statuses</CardTitle>
          <CardDescription>Order status breakdown by day of the week</CardDescription>
        </div>
        <DateRangeFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
            <XAxis
              dataKey="day"
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
              cursor={{ fill: 'rgba(59, 193, 207, 0.1)' }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar dataKey="pending" fill="#94a3b8" radius={[8, 8, 0, 0]} />
            <Bar dataKey="confirmed" fill="#3BC1CF" radius={[8, 8, 0, 0]} />
            <Bar dataKey="processing" fill="#1974BB" radius={[8, 8, 0, 0]} />
            <Bar dataKey="shipped" fill="#60a5fa" radius={[8, 8, 0, 0]} />
            <Bar dataKey="delivered" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="cancelled" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
