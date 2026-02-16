import { ColumnDef } from "@tanstack/react-table"
import { Link } from "react-router-dom"
import { Order } from "../types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, RefreshCcw, XCircle, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { getStatusConfig } from "../constants/order-status"

export function createOrderColumns(
  onUpdateStatus?: (order: Order) => void,
  onDelete?: (order: Order) => void,
  onCancel?: (order: Order) => void
): ColumnDef<Order>[] {
  return [
  {
    id: "order_number",
    accessorFn: (row) => row.order_summary.order_number,
    header: "Order Number",
    cell: ({ row }) => (
      <Link
        to={`/orders/view/${row.original.id}`}
        className="font-medium text-[#1974BB] dark:text-[#3BC1CF] hover:underline"
      >
        {row.original.order_summary.order_number}
      </Link>
    ),
  },

  {
    id: "client_name",
    accessorFn: (row) => row.client_information.name,
    header: "Client",
  },

  {
    id: "product",
    accessorFn: (row) => row.order_summary.product,
    header: "Product",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate font-medium">
        {row.original.order_summary.product}
      </div>
    ),
  },

  {
    id: "items_count",
    accessorFn: (row) => row.order_summary.items_count,
    header: "Items",
  },

  {
    id: "total",
    accessorFn: (row) => row.payment_details.total,
    header: "Total",
    cell: ({ row }) => {
      const total = Number(row.original.payment_details.total)
      return (
        <div className="font-semibold text-[#1974BB] dark:text-[#3BC1CF]">
          ${total.toLocaleString()}
        </div>
      )
    },
  },

  {
    id: "payment_status",
    accessorFn: (row) => row.payment_details.status,
    header: "Payment",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.payment_details.status}
      </Badge>
    ),
  },

  {
    id: "status",
    accessorFn: (row) => row.order_summary.status,
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.order_summary.status
      const config = getStatusConfig(status)

      return (
        <Badge
          className={`${config.bgColor} ${config.color} ${config.borderColor} border-2 font-semibold text-sm px-3 py-1`}
        >
          {config.icon}
          <span className="ml-1.5">{config.label}</span>
        </Badge>
      )
    },
  },

  {
    id: "created_at",
    accessorFn: (row) => row.created_at,
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at)
      return <span>{date.toLocaleDateString()}</span>
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
      const status = order.order_summary.status
      const isCancellable =
        status !== "cancelled" && status !== "delivered"

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuItem asChild>
              <Link
                to={`/orders/view/${order.id}`}
                className="flex items-center"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onUpdateStatus?.(order)}
              className="cursor-pointer"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Update Status
            </DropdownMenuItem>

            {isCancellable && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onCancel?.(order)}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Order
                </DropdownMenuItem>
              </>
            )}
            
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete?.(order)}
              className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  ]
}

// Default export for backward compatibility
export const orderColumns = createOrderColumns(undefined, undefined, undefined)
