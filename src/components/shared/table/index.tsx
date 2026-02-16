import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  PaginationState,
} from '@tanstack/react-table'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TableSearch } from './TableSearch'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { TablePagination } from './TablePagination'
import { TableSkeleton } from './TableSkeleton'
import type { DataTableProps } from './types'

export function DataTable<TData, TValue>({
  columns,
  data,
  count,
  pageSize = 10,
  manualPagination = false,
  onPaginationChange,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  
  // Get page from URL params, default to 0
  const pageParam = searchParams.get('page')
  const pageIndex = pageParam ? parseInt(pageParam) - 1 : 0
  
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex,
    pageSize,
  })

  // Update pagination when URL param changes
  useEffect(() => {
    const newPageIndex = pageParam ? parseInt(pageParam) - 1 : 0
    setPagination(prev => ({
      ...prev,
      pageIndex: newPageIndex,
    }))
  }, [pageParam])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination,
    pageCount: manualPagination && count ? Math.ceil(Number(count) / pageSize) : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater
      setPagination(newPagination)
      
      // Update URL param
      const newPage = newPagination.pageIndex + 1
      const params = new URLSearchParams(searchParams)
      if (newPage > 1) {
        params.set('page', newPage.toString())
      } else {
        params.delete('page')
      }
      setSearchParams(params)
      
      // Call custom handler if provided
      onPaginationChange?.(newPagination.pageIndex)
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
  })


  return (
    <div className="space-y-4">
      <TableSearch
        value={globalFilter}
        onChange={setGlobalFilter}
        resultsCount={count}
      />

      <div className="rounded-md border">
        <table className="w-full">
          <TableHeader headerGroups={table.getHeaderGroups()} />
          {isLoading ? (
            <TableSkeleton columnsCount={columns.length} rowsCount={pageSize} />
          ) : (
            <TableBody
              rows={table.getRowModel().rows}
              columnsCount={columns.length}
            />
          )}
        </table>
      </div>

      <TablePagination table={table} />
    </div>
  )
}

// Re-export subcomponents
export { TableSearch } from './TableSearch'
export { TableHeader } from './TableHeader'
export { TableBody } from './TableBody'
export { TablePagination } from './TablePagination'
export { TableSkeleton } from './TableSkeleton'
export { SortableHeader } from './SortableHeader'
export type { DataTableProps, SortableHeaderProps } from './types'

