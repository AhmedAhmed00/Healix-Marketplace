import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Key, Ban, CheckCircle, Edit } from 'lucide-react'

interface PatientHeaderProps {
  isBlocked: boolean
}

export function PatientHeader({ isBlocked }: PatientHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <Button variant="ghost" onClick={() => navigate('/patients')} className="gap-2 w-fit">
        <ArrowLeft className="h-4 w-4" />
        Back to Patients
      </Button>

      <div className="flex gap-2">
        <Button variant="outline" className="gap-2">
          <Key className="h-4 w-4" />
          <span className="hidden sm:inline">Reset Password</span>
        </Button>
        {isBlocked ? (
          <Button variant="outline" className="gap-2 text-green-600 border-green-600 hover:bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Unblock</span>
          </Button>
        ) : (
          <Button variant="outline" className="gap-2 text-orange-600 border-orange-600 hover:bg-orange-50">
            <Ban className="h-4 w-4" />
            <span className="hidden sm:inline">Block</span>
          </Button>
        )}
        <Button className="gap-2 bg-linear-to-r from-[rgb(var(--brand-primary))] to-[rgb(var(--brand-secondary))]">
          <Edit className="h-4 w-4" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
      </div>
    </div>
  )
}
