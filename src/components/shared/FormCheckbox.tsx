import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormCheckboxProps {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
}

export function FormCheckbox({
  id,
  label,
  checked,
  onCheckedChange,
  className,
}: FormCheckboxProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label
        htmlFor={id}
        className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </Label>
    </div>
  )
}
