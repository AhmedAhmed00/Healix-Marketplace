/**
 * Order Filters Component
 * Filter controls for orders
 */

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
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
import { CalendarIcon, X, Filter } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

type PaymentStatusFilter = 'unpaid' | 'paid' | 'partially_paid' | 'failed' | 'refunded' | 'all'

interface OrderFiltersProps {
  paymentStatusFilter: PaymentStatusFilter
  startDate: Date | undefined
  endDate: Date | undefined
  minTotal: string
  maxTotal: string
  onPaymentStatusChange: (status: PaymentStatusFilter) => void
  onStartDateChange: (date: Date | undefined) => void
  onEndDateChange: (date: Date | undefined) => void
  onMinTotalChange: (value: string) => void
  onMaxTotalChange: (value: string) => void
  onClearFilters: () => void
}

const PAYMENT_STATUS_OPTIONS: { value: PaymentStatusFilter; label: string }[] = [
  { value: 'all', label: 'All Payment Status' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'paid', label: 'Paid' },
  { value: 'partially_paid', label: 'Partially Paid' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
]

export function OrderFilters({
  paymentStatusFilter,
  startDate,
  endDate,
  minTotal,
  maxTotal,
  onPaymentStatusChange,
  onStartDateChange,
  onEndDateChange,
  onMinTotalChange,
  onMaxTotalChange,
  onClearFilters,
}: OrderFiltersProps) {
  const hasActiveFilters =
    paymentStatusFilter !== 'all' ||
    startDate ||
    endDate ||
    minTotal ||
    maxTotal

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-muted-foreground">Filters</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        {/* Payment Status Filter */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Payment Status</Label>
          <Select
            value={paymentStatusFilter}
            onValueChange={(value) => onPaymentStatusChange(value as PaymentStatusFilter)}
          >
            <SelectTrigger className="w-full h-9 text-sm">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>



        {/* Min Total */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Min Total</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={minTotal}
            onChange={(e) => onMinTotalChange(e.target.value)}
            className="w-full h-9 text-sm"
            min="0"
            step="0.01"
          />
        </div>

        {/* Max Total */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Max Total</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={maxTotal}
            onChange={(e) => onMaxTotalChange(e.target.value)}
            className="w-full h-9 text-sm"
            min="0"
            step="0.01"
          />
        </div>


        {/* Start Date */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full h-9 py-5.5 px-3 justify-start text-left font-normal text-sm bg-transparent shadow-none hover:bg-accent',
                  !startDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon />
                {startDate ? format(startDate, 'MMM d, yyyy') : 'From date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={onStartDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full h-9 px-3 justify-start text-left font-normal text-sm bg-transparent shadow-none hover:bg-accent',
                  !endDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon />
                {endDate ? format(endDate, 'MMM d, yyyy') : 'To date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={onEndDateChange}
                disabled={(date) => (startDate ? date < startDate : false)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>


        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground opacity-0">Clear</Label>
            <Button
              variant="ghost"
              onClick={onClearFilters}
              className="w-full h-9 text-sm text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
            >
              <X className="mr-1 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
