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

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const image = row.getValue('image') as string
      return (
        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
          {image ? (
            <img src={image} alt="Product" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px]">
              No Image
            </div>
          )}
        </div>
      )
    }
  },
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
    accessorKey: 'brand',
    header: ({ column }) => <SortableHeader column={column}>Brand</SortableHeader>,
    cell: ({ row }) => {
      const brand = row.getValue('brand') as string
      return <div className="text-sm">{brand || 'N/A'}</div>
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
    accessorKey: 'saleType',
    header: ({ column }) => <SortableHeader column={column}>Sale Type</SortableHeader>,
    cell: ({ row }) => {
      const saleType = row.getValue('saleType') as string
      const isLease = saleType === 'lease'
      return (
        <Badge className={isLease ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-blue-100 text-blue-700 border-blue-200'}>
          {saleType.charAt(0).toUpperCase() + saleType.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <SortableHeader column={column}>Price</SortableHeader>,
    cell: ({ row }) => {
      const price = row.getValue('price') as number
      const saleType = row.original.saleType
      return (
        <div className="font-semibold text-[#1974BB] dark:text-[#3BC1CF]">
          ${price.toLocaleString()}
          {saleType === 'lease' && <span className="text-[10px] ml-1">/mo</span>}
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
