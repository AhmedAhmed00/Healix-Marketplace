import { useState, useMemo } from 'react'
import { Routes, Route } from 'react-router'
import { PatientsList, PatientsFilters } from './components'
import { mockPatients, patientStats } from './data/mockPatients'
import { PatientFilterStatus, PatientFilterType } from './types'
import { Button } from '@/components/ui/button'
import { Plus, Download, Users } from 'lucide-react'
import { StatsCardGrid } from '@/components/shared/stats'
import ViewPatientPage from './pages/ViewPatientPage'

function PatientsPage() {
  const [statusFilter, setStatusFilter] = useState<PatientFilterStatus>('all')
  const [typeFilter, setTypeFilter] = useState<PatientFilterType>('all')

  // Filter patients based on filters (search is handled by DataTable)
  const filteredPatients = useMemo(() => {
    return mockPatients.filter((patient) => {
      // Status filter
      const matchesStatus = statusFilter === 'all' || patient.accountStatus === statusFilter

      // Type filter
      const matchesType = typeFilter === 'all' || patient.type === typeFilter

      return matchesStatus && matchesType
    })
  }, [statusFilter, typeFilter])

  const handleAddPatient = () => {
    console.log('Add new patient')
    // TODO: Implement add patient dialog
  }

  const handleExport = () => {
    console.log('Export patients data')
    // TODO: Implement export functionality
  }

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Patients',
      value: patientStats.totalPatients.toLocaleString(),
      icon: Users,
      colorVariant: 'primary' as const,
      trend: {
        value: 12.5,
        label: 'vs last month',
        isPositive: true,
      },
    },
    {
      title: 'Active Patients',
      value: patientStats.activePatients.toLocaleString(),
      icon: Users,
      colorVariant: 'primary' as const,
      trend: {
        value: 8.3,
        label: 'vs last month',
        isPositive: true,
      },
    },
    {
      title: 'New This Month',
      value: patientStats.newThisMonth.toLocaleString(),
      icon: Plus,
      colorVariant: 'primary' as const,
      trend: {
        value: 15.7,
        label: 'vs last month',
        isPositive: true,
      },
    },
    {
      title: 'Average Rating',
      value: patientStats.averageRating.toFixed(1),
      icon: Users,
      colorVariant: 'primary' as const,
      trend: {
        value: 0.3,
        label: 'vs last month',
        isPositive: true,
      },
    },
  ]

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
            Patient Management
          </h1>
          <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
            Manage all patient-related information and activities
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExport}
            className="gap-2 border-[rgb(var(--brand-primary))]/20 
              hover:border-[rgb(var(--brand-primary))]/40 
              hover:bg-[rgb(var(--brand-primary))]/10"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button
            onClick={handleAddPatient}
            className="gap-2 bg-linear-to-r from-[rgb(var(--brand-primary))] to-[rgb(var(--brand-secondary))]
              hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Patient</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCardGrid cards={statsCards} columns={{ default: 1, sm: 2, lg: 4 }} />

      {/* Filters */}
      <PatientsFilters
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
      />

      {/* Patients List with Built-in Search */}
      <PatientsList patients={filteredPatients} />
    </div>
  )
}

export default function PatientsRoutes() {
  return (
    <Routes>
      <Route index element={<PatientsPage />} />
      <Route path="/view/:id" element={<ViewPatientPage />} />
    </Routes>
  )
}

