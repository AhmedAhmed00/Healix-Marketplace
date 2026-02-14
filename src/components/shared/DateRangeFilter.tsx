import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'

export interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

interface DateRangeFilterProps {
  from?: Date
  to?: Date
  onFromChange?: (date: Date | undefined) => void
  onToChange?: (date: Date | undefined) => void
  className?: string
}

export function DateRangeFilter({
  from,
  to,
  onFromChange,
  onToChange,
  className,
}: DateRangeFilterProps) {
  return (
    <div className={cn('flex flex-wrap items-end gap-2', className)}>
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">From</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'w-[140px] justify-start text-left font-normal text-xs',
                !from && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-3.5 w-3.5" />
              {from ? format(from, 'dd MMM yyyy') : 'Pick date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={from} onSelect={onFromChange} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">To</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                'w-[140px] justify-start text-left font-normal text-xs',
                !to && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-3.5 w-3.5" />
              {to ? format(to, 'dd MMM yyyy') : 'Pick date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={to}
              onSelect={onToChange}
              disabled={from ? (date) => date < from : undefined}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
