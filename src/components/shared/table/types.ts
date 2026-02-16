import { ColumnDef } from '@tanstack/react-table'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  count?: number | string
  pageSize?: number
  manualPagination?: boolean
  onPaginationChange?: (pageIndex: number) => void
  isLoading?: boolean
}

export interface SortableHeaderProps {
  column: any
  children: React.ReactNode
}

