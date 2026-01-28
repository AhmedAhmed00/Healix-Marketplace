import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Line, LineChart } from 'recharts'
import { salesData } from '../data/mockData'

export function RevenueChart() {
  return (
    <Card className="border-t-4 border-t-[#3BC1CF]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-[#1974BB] dark:text-[#3BC1CF]">Revenue Trend</CardTitle>
        <CardDescription className="text-xs md:text-sm">Daily revenue and orders over time</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={300} minHeight={250}>
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3BC1CF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3BC1CF" stopOpacity={0}/>
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
