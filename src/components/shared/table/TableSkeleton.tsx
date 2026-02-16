import { Skeleton } from '@/components/ui/skeleton'

interface TableSkeletonProps {
  columnsCount: number
  rowsCount?: number
}

export function TableSkeleton({ columnsCount, rowsCount = 5 }: TableSkeletonProps) {
  return (
    <tbody>
      {Array.from({ length: rowsCount }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b">
          {Array.from({ length: columnsCount }).map((_, colIndex) => (
            <td key={colIndex} className="p-4 align-middle">
              <Skeleton className="h-4 w-full" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
