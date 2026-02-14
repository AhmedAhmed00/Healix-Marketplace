import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PatientFilterStatus, PatientFilterType } from '../types'

interface PatientsFiltersProps {
  statusFilter: PatientFilterStatus
  onStatusFilterChange: (status: PatientFilterStatus) => void
  typeFilter: PatientFilterType
  onTypeFilterChange: (type: PatientFilterType) => void
}

export function PatientsFilters({
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
}: PatientsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
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

