import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { MostPaidOrder } from '../types'

const mostPaidOrdersData: MostPaidOrder[] = [
  { id: '1', productName: 'Premium Electronics Bundle', clientName: 'John Smith', amount: 2450, date: '2026-01-20', status: 'delivered' },
  { id: '2', productName: 'Designer Furniture Set', clientName: 'Sarah Johnson', amount: 1890, date: '2026-01-19', status: 'shipped' },
  { id: '3', productName: 'Smart Home System', clientName: 'Michael Chen', amount: 1650, date: '2026-01-18', status: 'delivered' },
  { id: '4', productName: 'Luxury Watch Collection', clientName: 'Emily Davis', amount: 1420, date: '2026-01-17', status: 'processing' },
  { id: '5', productName: 'Professional Camera Kit', clientName: 'David Wilson', amount: 1280, date: '2026-01-16', status: 'delivered' },
  { id: '6', productName: 'Gaming Console Bundle', clientName: 'Lisa Anderson', amount: 1150, date: '2026-01-15', status: 'shipped' },
  { id: '7', productName: 'Fitness Equipment Set', clientName: 'Robert Brown', amount: 980, date: '2026-01-14', status: 'delivered' },
  { id: '8', productName: 'Kitchen Appliance Pack', clientName: 'Jennifer Taylor', amount: 850, date: '2026-01-13', status: 'confirmed' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return '#10b981'
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

export function MostPaidOrdersChart() {
  // Sort by amount descending and take top 8
  const sortedData = [...mostPaidOrdersData]
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
    <Card className="border-t-4 border-t-[#3BC1CF]">
      <CardHeader>
        <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Most Paid Orders</CardTitle>
        <CardDescription>Top orders by payment amount</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart 
            data={sortedData} 
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
            <XAxis 
              type="number"
              stroke="#6b7280"
              className="dark:stroke-slate-400"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <YAxis 
              type="category"
              dataKey="shortName"
              stroke="#6b7280"
              className="dark:stroke-slate-400"
              style={{ fontSize: '11px' }}
              width={90}
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
              radius={[0, 8, 8, 0]}
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
            <span>Delivered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#60a5fa]"></div>
            <span>Shipped</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1974BB]"></div>
            <span>Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3BC1CF]"></div>
            <span>Confirmed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
