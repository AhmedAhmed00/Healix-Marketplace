import { ColumnDef } from '@tanstack/react-table'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export interface SortableHeaderProps {
  column: any
  children: React.ReactNode
}

