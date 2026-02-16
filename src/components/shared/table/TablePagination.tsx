import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

interface TablePaginationProps<TData> {
  table: Table<TData>
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()
  const canPreviousPage = table.getCanPreviousPage()
  const canNextPage = table.getCanNextPage()

  // Don't show pagination if there's only one page or no pages
  if (pageCount <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {pageIndex + 1} of {pageCount}
      </div>
      <div className="flex items-center space-x-2">
        {canPreviousPage && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              aria-label="Go to first page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              aria-label="Go to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </>
        )}
        {canNextPage && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              aria-label="Go to next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(pageCount - 1)}
              aria-label="Go to last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

