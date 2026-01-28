import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface OrdersSearchProps {
  value: string
  onChange: (value: string) => void
}

export function OrdersSearch({ value, onChange }: OrdersSearchProps) {
  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search orders..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 w-full"
      />
    </div>
  )
}
