import { Patient } from '../types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  MoreHorizontal,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  Key,
  Trash2,
} from 'lucide-react'
import { useNavigate } from 'react-router'

export const getStatusBadge = (status: Patient['accountStatus']) => {
  const variants = {
    active: { variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600' },
    blocked: { variant: 'destructive' as const, className: '' },
    pending: { variant: 'secondary' as const, className: 'bg-orange-500 hover:bg-orange-600 text-white' },
    suspended: { variant: 'outline' as const, className: 'border-yellow-500 text-yellow-700 dark:text-yellow-400' },
  }
  
  const config = variants[status]
  
  return (
    <Badge variant={config.variant} className={config.className}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export const getTypeBadge = (type: Patient['type']) => {
  return type === 'individual' ? (
    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
      Individual
    </Badge>
  ) : (
    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">
      Organization
    </Badge>
  )
}

interface ActionsMenuProps {
  patient: Patient
  onView: (id: string) => void
  onEdit?: (id: string) => void
  onBlock?: (id: string) => void
  onUnblock?: (id: string) => void
  onResetPassword?: (id: string) => void
  onDelete?: (id: string) => void
}

export function ActionsMenu({
  patient,
  onView,
  onEdit,
  onBlock,
  onUnblock,
  onResetPassword,
  onDelete,
}: ActionsMenuProps) {
  const isBlocked = patient.accountStatus === 'blocked'
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onView(patient.id)} className="cursor-pointer">
          <Eye className="mr-2 h-4 w-4" />
          <span>View Details</span>
        </DropdownMenuItem>
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(patient.id)} className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit Patient</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {onResetPassword && (
          <DropdownMenuItem onClick={() => onResetPassword(patient.id)} className="cursor-pointer">
            <Key className="mr-2 h-4 w-4" />
            <span>Reset Password</span>
          </DropdownMenuItem>
        )}
        {isBlocked ? (
          onUnblock && (
            <DropdownMenuItem onClick={() => onUnblock(patient.id)} className="cursor-pointer text-green-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>Unblock Account</span>
            </DropdownMenuItem>
          )
        ) : (
          onBlock && (
            <DropdownMenuItem onClick={() => onBlock(patient.id)} className="cursor-pointer text-orange-600">
              <Ban className="mr-2 h-4 w-4" />
              <span>Block Account</span>
            </DropdownMenuItem>
          )
        )}
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(patient.id)} className="cursor-pointer text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete Patient</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function usePatientColumns() {
  const navigate = useNavigate()

  const handleView = (id: string) => {
    navigate(`/patients/view/${id}`)
  }

  const handleEdit = (id: string) => {
    console.log('Edit patient:', id)
    // TODO: Implement edit functionality
  }

  const handleBlock = (id: string) => {
    console.log('Block patient:', id)
    // TODO: Implement block functionality
  }

  const handleUnblock = (id: string) => {
    console.log('Unblock patient:', id)
    // TODO: Implement unblock functionality
  }

  const handleResetPassword = (id: string) => {
    console.log('Reset password for patient:', id)
    // TODO: Implement reset password functionality
  }

  const handleDelete = (id: string) => {
    console.log('Delete patient:', id)
    // TODO: Implement delete functionality
  }

  const renderPatientInfo = (patient: Patient) => {
    const displayName = patient.type === 'organization' 
      ? patient.organizationName 
      : `${patient.firstName} ${patient.lastName}`
    
    const initials = patient.type === 'organization'
      ? patient.organizationName?.substring(0, 2).toUpperCase()
      : `${patient.firstName[0]}${patient.lastName[0]}`

    return (
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={patient.profileImage} alt={displayName} />
          <AvatarFallback className="bg-linear-to-br from-[#3BC1CF] to-[#1974BB] text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{displayName}</span>
          <span className="text-xs text-muted-foreground">{patient.id}</span>
        </div>
      </div>
    )
  }

  return {
    renderPatientInfo,
    handleView,
    handleEdit,
    handleBlock,
    handleUnblock,
    handleResetPassword,
    handleDelete,
  }
}

