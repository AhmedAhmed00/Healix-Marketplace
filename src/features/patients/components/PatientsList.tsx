import { ColumnDef } from '@tanstack/react-table'
import { Patient } from '../types'
import { DataTable } from '@/components/shared/table'
import { usePatientColumns, getStatusBadge, getTypeBadge, ActionsMenu } from './PatientTableColumns'
import { Mail, Phone, MapPin, DollarSign, Star } from 'lucide-react'

interface PatientsListProps {
  patients: Patient[]
}

export function PatientsList({ patients }: PatientsListProps) {
  const {
    renderPatientInfo,
    handleView,
    handleEdit,
    handleBlock,
    handleUnblock,
    handleResetPassword,
    handleDelete,
  } = usePatientColumns()

  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: 'id',
      header: 'Patient',
      cell: ({ row }) => renderPatientInfo(row.original),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => getTypeBadge(row.original.type),
    },
    {
      id: 'contact',
      header: 'Contact',
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-xs">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span className="truncate max-w-[200px]">{row.original.email}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>{row.original.phone}</span>
          </div>
        </div>
      ),
    },

    {
      accessorKey: 'accountStatus',
      header: 'Status',
      cell: ({ row }) => getStatusBadge(row.original.accountStatus),
    },



    {
      accessorKey: 'registrationDate',
      header: 'Registration',
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {new Date(row.original.registrationDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <ActionsMenu
            patient={row.original}
            onView={handleView}
            onEdit={handleEdit}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            onResetPassword={handleResetPassword}
            onDelete={handleDelete}
          />
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={patients} />
}

