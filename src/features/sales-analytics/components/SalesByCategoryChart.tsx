import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { salesByCategory } from '../data/mockData'

const COLORS = ['#3BC1CF', '#1974BB', '#60a5fa', '#38bdf8', '#0ea5e9', '#94a3b8']

export function SalesByCategoryChart() {
  return (
    <Card className="border-t-4 border-t-[#1974BB]">
      <CardHeader>
        <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Sales by Category</CardTitle>
        <CardDescription>Revenue distribution across product categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={salesByCategory}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(props: any) => {
                const { category, percent } = props
                return category ? `${category}: ${(percent * 100).toFixed(0)}%` : ''
              }}
              outerRadius={100}
              fill="#8884d8"
              dataKey="revenue"
            >
              {salesByCategory.map((entry, index) => (
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
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
