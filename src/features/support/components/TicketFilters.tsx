/**
 * Ticket Filters Component
 * Filter controls for support tickets
 */

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, X } from 'lucide-react'
import { format } from 'date-fns'
import { TICKET_STATUS_CONFIG } from '../types'
import type { TicketStatus } from '../types'
import { cn } from '@/lib/utils'

type StatusFilter = TicketStatus | 'all'

interface TicketFiltersProps {
  statusFilter: StatusFilter
  dateFrom: Date | undefined
  dateTo: Date | undefined
  onStatusChange: (status: StatusFilter) => void
  onDateFromChange: (date: Date | undefined) => void
  onDateToChange: (date: Date | undefined) => void
  onClearFilters: () => void
}

export function TicketFilters({
  statusFilter,
  dateFrom,
  dateTo,
  onStatusChange,
  onDateFromChange,
  onDateToChange,
  onClearFilters,
}: TicketFiltersProps) {
  const hasActiveFilters = statusFilter !== 'all' || dateFrom || dateTo

  return (
    <div className="flex flex-wrap items-end gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
      {/* Status Filter */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Status</Label>
        <Select value={statusFilter} onValueChange={(value) => onStatusChange(value as StatusFilter)}>
          <SelectTrigger className="w-[150px] h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {(Object.keys(TICKET_STATUS_CONFIG) as TicketStatus[]).map((status) => (
              <SelectItem key={status} value={status}>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'w-2 h-2 rounded-full',
                      status === 'open' && 'bg-blue-500',
                      status === 'in_progress' && 'bg-amber-500',
                      status === 'resolved' && 'bg-emerald-500',
                      status === 'closed' && 'bg-slate-500'
                    )}
                  />
                  {TICKET_STATUS_CONFIG[status].label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date From */}
      <div className="space-y-1.5">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[150px] h-9 justify-start text-left font-normal',
                !dateFrom && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFrom ? format(dateFrom, 'MMM d, yyyy') : 'From date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={onDateFromChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Date To */}
      <div className="space-y-1.5">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[150px] h-9 justify-start text-left font-normal',
                !dateTo && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTo ? format(dateTo, 'MMM d, yyyy') : 'To date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={onDateToChange}
              disabled={(date) => (dateFrom ? date < dateFrom : false)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
        >
          <X className="mr-1 h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  )
}
