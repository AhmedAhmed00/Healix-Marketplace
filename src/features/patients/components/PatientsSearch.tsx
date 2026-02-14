import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PatientFilterStatus, PatientFilterType } from '../types'

interface PatientsSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: PatientFilterStatus
  onStatusFilterChange: (status: PatientFilterStatus) => void
  typeFilter: PatientFilterType
  onTypeFilterChange: (type: PatientFilterType) => void
}

export function PatientsSearch({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
}: PatientsSearchProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, phone, or ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 border-[rgb(var(--brand-primary))]/20 
            focus:border-[rgb(var(--brand-primary))] 
            dark:border-[rgb(var(--brand-primary))]/30"
        />
      </div>

      {/* Status Filter */}
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full sm:w-[180px] border-[rgb(var(--brand-primary))]/20 
          focus:border-[rgb(var(--brand-primary))] 
          dark:border-[rgb(var(--brand-primary))]/30">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="blocked">Blocked</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>

      {/* Type Filter */}
      <Select value={typeFilter} onValueChange={onTypeFilterChange}>
        <SelectTrigger className="w-full sm:w-[180px] border-[rgb(var(--brand-primary))]/20 
          focus:border-[rgb(var(--brand-primary))] 
          dark:border-[rgb(var(--brand-primary))]/30">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="individual">Individual</SelectItem>
          <SelectItem value="organization">Organization</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

