import { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { Order } from '../types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SortableHeader } from '@/components/shared/table'
import { MoreHorizontal, Eye, RefreshCcw, XCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { getStatusConfig } from '../constants/order-status'

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => <SortableHeader column={column}>Order Number</SortableHeader>,
    cell: ({ row }) => {
      const order = row.original
      return (
        <Link
          to={`/orders/view/${order.id}`}
          className="font-medium text-[#1974BB] dark:text-[#3BC1CF] cursor-pointer hover:underline"
        >
          {row.getValue('orderNumber')}
        </Link>
      )
    },
  },
  {
    accessorKey: 'product',
    header: ({ column }) => <SortableHeader column={column}>Product Name</SortableHeader>,
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="max-w-[200px] truncate font-medium">
          {order.product}
        </div>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <SortableHeader column={column}>Price</SortableHeader>,
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number
      return (
        <div className="font-semibold text-[#1974BB] dark:text-[#3BC1CF]">
          ${amount.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => {
      const status = row.getValue('status') as Order['status']
      const config = getStatusConfig(status)
      return (
        <Badge className={`${config.bgColor} ${config.color} ${config.borderColor} border-2 font-semibold text-sm px-3 py-1`}>
          {config.icon} <span className="ml-1.5">{config.label}</span>
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original
      const isCancellable = order.status !== 'cancelled' && order.status !== 'delivered'

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuItem asChild>
              <Link to={`/orders/view/${order.id}`} className="flex items-center cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { /* TODO: Open update status modal */ }}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Update Status
            </DropdownMenuItem>
            {isCancellable && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Order
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
