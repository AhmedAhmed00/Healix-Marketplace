import { useState, useMemo } from 'react'
import { subDays } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { DateRangeFilter } from '@/components/shared/DateRangeFilter'
import { MostPaidOrder } from '../types'

const mostPaidOrdersData: MostPaidOrder[] = [
  { id: '1', productName: 'Premium Electronics Bundle', clientName: 'John Smith', amount: 2450, date: '2026-01-20', status: 'delivered', city: 'New York' },
  { id: '2', productName: 'Designer Furniture Set', clientName: 'Sarah Johnson', amount: 1890, date: '2026-01-19', status: 'shipped', city: 'Los Angeles' },
  { id: '3', productName: 'Smart Home System', clientName: 'Michael Chen', amount: 1650, date: '2026-01-18', status: 'delivered', city: 'Chicago' },
  { id: '4', productName: 'Luxury Watch Collection', clientName: 'Emily Davis', amount: 1420, date: '2026-01-17', status: 'processing', city: 'New York' },
  { id: '5', productName: 'Professional Camera Kit', clientName: 'David Wilson', amount: 1280, date: '2026-01-16', status: 'delivered', city: 'Houston' },
  { id: '6', productName: 'Gaming Console Bundle', clientName: 'Lisa Anderson', amount: 1150, date: '2026-01-15', status: 'shipped', city: 'Phoenix' },
  { id: '7', productName: 'Fitness Equipment Set', clientName: 'Robert Brown', amount: 980, date: '2026-01-14', status: 'delivered', city: 'New York' },
  { id: '8', productName: 'Kitchen Appliance Pack', clientName: 'Jennifer Taylor', amount: 850, date: '2026-01-13', status: 'confirmed', city: 'Los Angeles' },
  { id: '9', productName: '4K OLED TV', clientName: 'Anthony Rogers', amount: 3100, date: '2026-01-12', status: 'delivered', city: 'Chicago' },
  { id: '10', productName: 'Gaming Laptop Pro', clientName: 'Natalie Diaz', amount: 2750, date: '2026-01-11', status: 'processing', city: 'Houston' },
  { id: '11', productName: 'Smartphone Ultra Max', clientName: 'Kevin Lee', amount: 1550, date: '2026-01-10', status: 'shipped', city: 'Phoenix' },
  { id: '12', productName: 'Ergonomic Office Chair', clientName: 'Olivia Green', amount: 920, date: '2026-01-09', status: 'confirmed', city: 'New York' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return '#1974BB'
    case 'shipped':
      return '#60a5fa'
    case 'processing':
      return '#1974BB'
    case 'confirmed':
      return '#3BC1CF'
    default:
      return '#94a3b8'
  }
}

const defaultTo = new Date('2026-01-20')
const defaultFrom = subDays(defaultTo, 9)

interface MostPaidOrdersChartProps {
  city?: string
}

export function MostPaidOrdersChart({ city }: MostPaidOrdersChartProps) {
  const [from, setFrom] = useState<Date | undefined>(defaultFrom)
  const [to, setTo] = useState<Date | undefined>(defaultTo)

  const filteredByDate = useMemo(() => {
    let data = mostPaidOrdersData
    if (city && city !== 'All') {
      data = data.filter((row) => row.city === city)
    }
    if (!from && !to) return data
    return data.filter((row) => {
      const d = new Date(row.date)
      if (from && d < from) return false
      if (to && d > to) return false
      return true
    })
  }, [from, to, city])

  // Sort by amount descending and take top 8
  const sortedData = [...filteredByDate]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 8)
    .map((order, index) => ({
      ...order,
      shortName: order.productName.length > 20
        ? `${order.productName.substring(0, 20)}...`
        : order.productName,
      index: index + 1,
    }))

  return (
    <Card className="">
      <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Most Paid Orders</CardTitle>
          <CardDescription>Top orders by payment amount</CardDescription>
        </div>
        <DateRangeFilter from={from} to={to} onFromChange={setFrom} onToChange={setTo} />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={sortedData}
            margin={{ top: 5, right: 30, left: 10, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
            <XAxis
              dataKey="shortName"
              stroke="#6b7280"
              className="dark:stroke-slate-400"
              style={{ fontSize: '11px' }}
              tickMargin={10}
            />
            <YAxis
              type="number"
              stroke="#6b7280"
              className="dark:stroke-slate-400"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
              labelFormatter={(label) => `Product: ${label}`}
              cursor={{ fill: 'rgba(59, 193, 207, 0.1)' }}
            />
            <Bar
              dataKey="amount"
              radius={[8, 8, 0, 0]}
              barSize={30}
              maxBarSize={30}
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  )
}
