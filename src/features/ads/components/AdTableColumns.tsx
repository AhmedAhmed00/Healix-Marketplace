import { ColumnDef } from '@tanstack/react-table'
import { Ad } from '../types'
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

export const getStatusConfig = (status: Ad['status']) => {
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
    case 'pending':
      return {
        label: 'Pending',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        color: 'text-yellow-700 dark:text-yellow-400',
        borderColor: 'border-yellow-300 dark:border-yellow-800',
      }
    case 'expired':
      return {
        label: 'Expired',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        color: 'text-red-700 dark:text-red-400',
        borderColor: 'border-red-300 dark:border-red-800',
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

export const getTypeConfig = (type: Ad['type']) => {
  switch (type) {
    case 'banner':
      return { label: 'Banner', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' }
    case 'sidebar':
      return { label: 'Sidebar', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400' }
    case 'popup':
      return { label: 'Popup', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400' }
    case 'video':
      return { label: 'Video', color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400' }
    case 'sponsored':
      return { label: 'Sponsored', color: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400' }
    default:
      return { label: type, color: 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400' }
  }
}

export const adColumns: ColumnDef<Ad>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <SortableHeader column={column}>Ad Title</SortableHeader>,
    cell: ({ row }) => {
      const ad = row.original
      return (
        <div>
          <Link
            to={`/ads/view/${ad.id}`}
            className="font-medium text-[#1974BB] dark:text-[#3BC1CF] hover:underline"
          >
            {ad.title}
          </Link>
          {ad.description && (
            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
              {ad.description}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <SortableHeader column={column}>Type</SortableHeader>,
    cell: ({ row }) => {
      const type = row.getValue('type') as Ad['type']
      const config = getTypeConfig(type)
      return (
        <Badge variant="outline" className={config.color}>
          {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'advertiser',
    header: ({ column }) => <SortableHeader column={column}>Advertiser</SortableHeader>,
    cell: ({ row }) => {
      const advertiser = row.getValue('advertiser') as string
      return <div className="text-sm">{advertiser}</div>
    },
  },
  {
    accessorKey: 'budget',
    header: ({ column }) => <SortableHeader column={column}>Budget</SortableHeader>,
    cell: ({ row }) => {
      const budget = row.getValue('budget') as number
      return (
        <div className="font-semibold text-[#1974BB] dark:text-[#3BC1CF]">
          ${budget.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: 'spent',
    header: ({ column }) => <SortableHeader column={column}>Spent</SortableHeader>,
    cell: ({ row }) => {
      const spent = row.getValue('spent') as number
      return <div className="font-medium">${spent.toLocaleString()}</div>
    },
  },
  {
    accessorKey: 'impressions',
    header: ({ column }) => <SortableHeader column={column}>Impressions</SortableHeader>,
    cell: ({ row }) => {
      const impressions = row.getValue('impressions') as number
      return <div className="text-sm">{impressions.toLocaleString()}</div>
    },
  },
  {
    accessorKey: 'clicks',
    header: ({ column }) => <SortableHeader column={column}>Clicks</SortableHeader>,
    cell: ({ row }) => {
      const clicks = row.getValue('clicks') as number
      const ad = row.original
      const ctr = ad.impressions > 0 ? ((clicks / ad.impressions) * 100).toFixed(2) : '0.00'
      return (
        <div>
          <div className="font-medium">{clicks.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">CTR: {ctr}%</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
    cell: ({ row }) => {
      const status = row.getValue('status') as Ad['status']
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
      const ad = row.original
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
              <Link to={`/ads/view/${ad.id}`} className="flex items-center cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/ads/edit/${ad.id}`} className="flex items-center cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit Ad
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 dark:text-red-400">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Ad
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
