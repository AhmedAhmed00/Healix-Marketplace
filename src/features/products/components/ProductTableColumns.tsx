import { ColumnDef } from '@tanstack/react-table'
import { Product } from '../types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SortableHeader } from '@/components/shared/table'
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const getStatusConfig = (status: Product['status']) => {
  switch (status) {
    case 'active':
      return {
        label: 'Active',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        color: 'text-green-700 dark:text-green-400',
        borderColor: 'border-green-300 dark:border-green-800',
      }
    case 'inactive':
      return {
        label: 'Inactive',
        bgColor: 'bg-gray-50 dark:bg-gray-900/20',
        color: 'text-gray-700 dark:text-gray-400',
        borderColor: 'border-gray-300 dark:border-gray-800',
      }
    case 'out_of_stock':
      return {
        label: 'Out of Stock',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        color: 'text-red-700 dark:text-red-400',
        borderColor: 'border-red-300 dark:border-red-800',
      }
    case 'draft':
      return {
        label: 'Draft',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        color: 'text-yellow-700 dark:text-yellow-400',
        borderColor: 'border-yellow-300 dark:border-yellow-800',
      }
    default:
      return {
        label: status,
        bgColor: 'bg-gray-50 dark:bg-gray-900/20',
        color: 'text-gray-700 dark:text-gray-400',
        borderColor: 'border-gray-300 dark:border-gray-800',
      }
  }
}

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column}>Product Name</SortableHeader>,
    cell: ({ row }) => {
      const product = row.original
      return (
        <div>
          <Link
            to={`/products/view/${product.id}`}
            className="font-medium text-[#1974BB] dark:text-[#3BC1CF] hover:underline text-left"
          >
            {product.name}
          </Link>
          <div className="text-xs text-muted-foreground truncate max-w-[200px]">
            {product.description}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <SortableHeader column={column}>Category</SortableHeader>,
    cell: ({ row }) => {
      const category = row.getValue('category') as string
      return (
        <Badge variant="outline" className="bg-[#3BC1CF]/10 text-[#1974BB] border-[#3BC1CF]/20">
          {category}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'sku',
    header: ({ column }) => <SortableHeader column={column}>SKU</SortableHeader>,
    cell: ({ row }) => {
      const sku = row.getValue('sku') as string
      return <div className="font-mono text-sm">{sku}</div>
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <SortableHeader column={column}>Price</SortableHeader>,
    cell: ({ row }) => {
      const product = row.original
      return (
        <div>
          <div className="font-semibold text-[#1974BB] dark:text-[#3BC1CF]">
            ${product.price.toLocaleString()}
          </div>
          {product.compareAtPrice && (
            <div className="text-xs text-muted-foreground line-through">
              ${product.compareAtPrice.toLocaleString()}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => <SortableHeader column={column}>Stock</SortableHeader>,
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number
      const isLowStock = stock < 10
      return (
        <div className={`font-medium ${isLowStock ? 'text-red-600 dark:text-red-400' : ''}`}>
          {stock.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => {
      const status = row.getValue('status') as Product['status']
      const config = getStatusConfig(status)
      return (
        <Badge className={`${config.bgColor} ${config.color} ${config.borderColor} border-2 font-semibold text-sm px-3 py-1`}>
          {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'seller',
    header: ({ column }) => <SortableHeader column={column}>Seller</SortableHeader>,
    cell: ({ row }) => {
      const seller = row.getValue('seller') as string
      return <div className="text-sm">{seller}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/products/view/${product.id}`} className="flex items-center cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/products/edit/${product.id}`} className="flex items-center cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit Product
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 dark:text-red-400">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
