import { ColumnDef } from '@tanstack/react-table'
import { ProductSales } from '../types'
import { Badge } from '@/components/ui/badge'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { SortableHeader } from '@/components/shared/table'

export const productColumns: ColumnDef<ProductSales>[] = [
  {
    accessorKey: 'productName',
    header: ({ column }) => <SortableHeader column={column} title="Product Name" />,
    cell: ({ row }) => (
      <div className="font-medium text-[#1974BB] dark:text-[#3BC1CF]">
        {row.getValue('productName')}
      </div>
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <SortableHeader column={column} title="Category" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-[#3BC1CF]/10 text-[#1974BB] border-[#3BC1CF]/20">
        {row.getValue('category')}
      </Badge>
    ),
  },
  {
    accessorKey: 'orders',
    header: ({ column }) => <SortableHeader column={column} title="Orders" />,
    cell: ({ row }) => {
      const orders = row.getValue('orders') as number
      return <div className="font-medium">{orders.toLocaleString()}</div>
    },
  },
  {
    accessorKey: 'revenue',
    header: ({ column }) => <SortableHeader column={column} title="Revenue" />,
    cell: ({ row }) => {
      const revenue = row.getValue('revenue') as number
      return (
        <div className="font-semibold text-[#1974BB] dark:text-[#3BC1CF]">
          ${revenue.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: 'growth',
    header: ({ column }) => <SortableHeader column={column} title="Growth" />,
    cell: ({ row }) => {
      const growth = row.getValue('growth') as number
      const isPositive = growth >= 0
      return (
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
          <span className="font-medium">{Math.abs(growth).toFixed(1)}%</span>
        </div>
      )
    },
  },
]
