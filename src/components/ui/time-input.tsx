import { TimeField } from 'react-aria-components'
import { cn } from '@/lib/utils'

import type { TimeValue } from 'react-aria-components'

interface TimeInputProps {
  id?: string
  value?: TimeValue | null
  onChange?: (value: TimeValue | null) => void
  hourCycle?: 12 | 24
  granularity?: 'hour' | 'minute' | 'second'
  className?: string
  'data-invalid'?: boolean
}

export function TimeInput({
  id,
  value,
  onChange,
  hourCycle = 24,
  granularity,
  className,
  'data-invalid': dataInvalid,
}: TimeInputProps) {
  return (
    <TimeField
      id={id}
      value={value ?? undefined}
      onChange={onChange}
      hourCycle={hourCycle}
      granularity={granularity}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background',
        'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        dataInvalid && 'border-destructive',
        className
      )}
    />
  )
}

