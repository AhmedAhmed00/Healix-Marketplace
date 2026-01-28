import { ColumnDef } from '@tanstack/react-table'
import { Order } from '../types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SortableHeader } from '@/components/shared/table'
import { MoreHorizontal, Eye } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getStatusConfig } from '../constants/order-status'

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => <SortableHeader column={column} title="Order Number" />,
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="font-medium text-[#1974BB] dark:text-[#3BC1CF]">
          {order.orderNumber}
        </div>
      )
    },
  },
  {
    accessorKey: 'clientName',
    header: ({ column }) => <SortableHeader column={column} title="Client" />,
    cell: ({ row }) => {
      const order = row.original
      return (
        <div>
          <div className="font-medium">{order.clientName}</div>
          <div className="text-xs text-muted-foreground">{order.clientEmail}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'product',
    header: ({ column }) => <SortableHeader column={column} title="Product" />,
    cell: ({ row }) => {
      const order = row.original
      return (
        <div>
          <div className="font-medium">{order.product}</div>
          <div className="text-xs text-muted-foreground">Qty: {order.quantity}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <SortableHeader column={column} title="Amount" />,
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
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status') as Order['status']
      const config = getStatusConfig(status)
      return (
        <Badge className={`${config.bgColor} ${config.color} ${config.borderColor} border-2 font-semibold text-sm px-3 py-1`}>
          {config.icon} {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: ({ column }) => <SortableHeader column={column} title="Payment" />,
    cell: ({ row }) => {
      const paymentStatus = row.getValue('paymentStatus') as Order['paymentStatus']
      const statusColors: Record<Order['paymentStatus'], string> = {
        completed: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
        failed: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
        refunded: 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800',
      }
      return (
        <Badge className={`${statusColors[paymentStatus]} border-2 font-semibold text-xs px-2 py-0.5`}>
          {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <SortableHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return (
        <div className="text-sm">
          <div>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          <div className="text-xs text-muted-foreground">{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const order = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
