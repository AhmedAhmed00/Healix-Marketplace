import { Input } from '@/components/ui/input'

interface TableSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  resultsCount?: number
}

export function TableSearch({ 
  value, 
  onChange, 
  placeholder = "Search all columns...",
  resultsCount 
}: TableSearchProps) {
  return (
    <div className="flex items-center justify-between gap-8">
      <Input
        placeholder={placeholder}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        // className="max-w-sm"
        className="w-[95%]"
      />
      {resultsCount !== undefined && (
        <div className="text-sm text-muted-foreground">
          {resultsCount} row(s) found
        </div>
      )}
    </div>
  )
}

