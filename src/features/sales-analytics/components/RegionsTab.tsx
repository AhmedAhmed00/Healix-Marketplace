import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { SalesByRegion } from '../types'
import { Globe } from 'lucide-react'

interface RegionsTabProps {
  regions: SalesByRegion[]
}

export function RegionsTab({ regions }: RegionsTabProps) {
  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-[#3BC1CF]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-[#1974BB] dark:text-[#3BC1CF]" />
            <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">Sales by Region</CardTitle>
          </div>
          <CardDescription>Revenue and orders breakdown by geographic region</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={regions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
              <XAxis 
                dataKey="region" 
                stroke="#6b7280"
                className="dark:stroke-slate-400"
                style={{ fontSize: '12px' }}
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
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                cursor={{ fill: 'rgba(59, 193, 207, 0.1)' }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar dataKey="revenue" fill="#3BC1CF" radius={[8, 8, 0, 0]} />
              <Bar dataKey="orders" fill="#1974BB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
