import { ColumnDef } from '@tanstack/react-table'
import { Product } from '../types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function createProductColumns(onDelete?: (product: Product) => void): ColumnDef<Product>[] {
  return [
  {
    accessorKey: 'main_image',
    id: 'image',
    header: 'Image',
    enableSorting: false,
    cell: ({ row }) => {
      const mainImage = row.original.main_image
      const images = row.original.images
      const imageToShow = mainImage || (images && images.length > 0 ? images[0] : null)

      return (
        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
          {imageToShow ? (
            <img
              src={imageToShow}
              alt={row.original.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.png'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px]">
              No Image
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
    enableSorting: false,
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
    header: 'Brand',
    enableSorting: false,
    cell: ({ row }) => {
      const brand = row.getValue('brand') as string
      return <div className="text-sm">{brand || 'N/A'}</div>
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    enableSorting: false,
    cell: ({ row }) => {
      const categoryId = row.getValue('category') as number
      return (
        <Badge variant="outline" className="bg-[#3BC1CF]/10 text-[#1974BB] border-[#3BC1CF]/20">
          Category #{categoryId}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'sale_type',
    header: 'Sale Type',
    enableSorting: false,
    cell: ({ row }) => {
      const saleType = row.original.sale_type
      const getBadgeStyles = () => {
        switch (saleType) {
          case 'sale':
            return 'bg-blue-100 text-blue-700 border-blue-200'
          case 'lease':
            return 'bg-purple-100 text-purple-700 border-purple-200'
          case 'both':
            return 'bg-green-100 text-green-700 border-green-200'
          default:
            return 'bg-gray-100 text-gray-700 border-gray-200'
        }
      }

      return (
        <Badge className={getBadgeStyles()}>
          {saleType.charAt(0).toUpperCase() + saleType.slice(1)}
        </Badge>
      )
    },
  },
  {
    id: 'price',
    header: 'Price',
    enableSorting: false,
    cell: ({ row }) => {
      const product = row.original
      const salePrice = parseFloat(product.price)
      const leasePrice = product.lease_price ? parseFloat(product.lease_price) : null

      return (
        <div>
          {(product.sale_type === 'sale' || product.sale_type === 'both') && (
            <div className="font-semibold text-[#1974BB] dark:text-[#3BC1CF]">
              ${salePrice.toLocaleString()}
            </div>
          )}
          {(product.sale_type === 'lease' || product.sale_type === 'both') && (
            <div className="text-xs text-muted-foreground">
              {leasePrice ? `$${leasePrice}/mo` : 'N/A'}
              {product.insurance_price && (
                <span className="ml-1 text-[10px]">
                  (Ins: ${parseFloat(product.insurance_price)})
                </span>
              )}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    enableSorting: false,
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number
      const isLowStock = stock < 10
      const isOutOfStock = stock === 0

      return (
        <div>
          <div
            className={`font-medium ${isOutOfStock ? 'text-red-600 dark:text-red-400' : isLowStock ? 'text-orange-600 dark:text-orange-400' : ''
              }`}
          >
            {stock.toLocaleString()}
          </div>
          {!row.original.is_active && (
            <Badge variant="outline" className="mt-1 text-xs bg-gray-100">
              Inactive
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
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
              <Link
                to={`/products/add?mode=update&product_id=${product.id}`}
                className="flex items-center cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Product
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(product)}
              className="text-red-600 dark:text-red-400 cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  ]
}

// Default export for backward compatibility
export const productColumns = createProductColumns()
