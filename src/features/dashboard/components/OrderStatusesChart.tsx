import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const orderStatusData = [
  { day: 'Mon', confirmed: 32, pending: 8, processing: 12, shipped: 15, delivered: 28, cancelled: 3 },
  { day: 'Tue', confirmed: 28, pending: 12, processing: 10, shipped: 18, delivered: 25, cancelled: 2 },
  { day: 'Wed', confirmed: 35, pending: 6, processing: 14, shipped: 20, delivered: 30, cancelled: 4 },
  { day: 'Thu', confirmed: 40, pending: 10, processing: 16, shipped: 22, delivered: 35, cancelled: 1 },
  { day: 'Fri', confirmed: 38, pending: 9, processing: 15, shipped: 19, delivered: 32, cancelled: 5 },
  { day: 'Sat', confirmed: 25, pending: 5, processing: 8, shipped: 12, delivered: 20, cancelled: 2 },
  { day: 'Sun', confirmed: 18, pending: 3, processing: 6, shipped: 10, delivered: 15, cancelled: 1 },
]

export function OrderStatusesChart() {
  return (
    <Card className="border-t-4 border-t-[#1974BB]">
      <CardHeader>
        <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Order Statuses</CardTitle>
        <CardDescription>Order status breakdown by day of the week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderStatusData}>
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
