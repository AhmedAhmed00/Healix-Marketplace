import { ColumnDef } from '@tanstack/react-table'
import { Category } from '../types'
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

export const getStatusConfig = (status: Category['status']) => {
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
    default:
      return {
        label: status,
        bgColor: 'bg-gray-50 dark:bg-gray-900/20',
        color: 'text-gray-700 dark:text-gray-400',
        borderColor: 'border-gray-300 dark:border-gray-800',
      }
  }
}

export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column}>Category Name</SortableHeader>,
    cell: ({ row }) => {
      const category = row.original
      return (
        <div className="flex items-center gap-3">
          {category.icon && (
            <span className="text-2xl">{category.icon}</span>
          )}
          <div>
            <Link
              to={`/categories/view/${category.id}`}
              className="font-medium text-[#1974BB] dark:text-[#3BC1CF] hover:underline"
            >
              {category.name}
            </Link>
            {category.description && (
              <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                {category.description}
              </div>
            )}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => <SortableHeader column={column}>Slug</SortableHeader>,
    cell: ({ row }) => {
      const slug = row.getValue('slug') as string
      return <div className="font-mono text-sm text-muted-foreground">{slug}</div>
    },
  },
  {
    accessorKey: 'productCount',
    header: ({ column }) => <SortableHeader column={column}>Products</SortableHeader>,
    cell: ({ row }) => {
      const count = row.getValue('productCount') as number
      return (
        <div className="font-medium text-[#1974BB] dark:text-[#3BC1CF]">
          {count.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => {
      const status = row.getValue('status') as Category['status']
      const config = getStatusConfig(status)
      return (
        <Badge className={`${config.bgColor} ${config.color} ${config.borderColor} border-2 font-semibold text-sm px-3 py-1`}>
          {config.label}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const category = row.original
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
              <Link to={`/categories/view/${category.id}`} className="flex items-center cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/categories/edit/${category.id}`} className="flex items-center cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit Category
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 dark:text-red-400">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
