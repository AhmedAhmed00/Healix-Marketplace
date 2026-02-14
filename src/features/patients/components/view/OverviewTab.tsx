import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Mail, Phone } from 'lucide-react'
import { getTypeBadge } from '../PatientTableColumns'
import type { Patient } from '../../types'

interface OverviewTabProps {
  patient: Patient
}

export function OverviewTab({ patient }: OverviewTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Patient Information</CardTitle>
        <CardDescription>Basic patient details and contact information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Full Name</p>
            <p className="text-base font-semibold">
              {patient.type === 'organization'
                ? patient.organizationName
                : `${patient.firstName} ${patient.lastName}`}
            </p>
          </div>

          {/* Birthdate */}
          {patient.dateOfBirth && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[rgb(var(--brand-primary))]" />
                <p className="text-base font-semibold">
                  {new Date(patient.dateOfBirth).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          )}

          {/* National ID */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">National ID</p>
            <p className="text-base font-semibold font-mono">
              {patient.nationalId || patient.id}
            </p>
          </div>

          {/* Gender */}
          {patient.gender && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Gender</p>
              <p className="text-base font-semibold capitalize">{patient.gender}</p>
            </div>
          )}

          {/* Phone */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[rgb(var(--brand-primary))]" />
              <p className="text-base font-semibold">{patient.phone}</p>
            </div>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Account Type</p>
            <div>{getTypeBadge(patient.type)}</div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Email Address</p>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[rgb(var(--brand-primary))]" />
              <p className="text-base font-semibold">{patient.email}</p>
            </div>
          </div>

          {/* Registration Date */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Registration Date</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[rgb(var(--brand-primary))]" />
              <p className="text-base font-semibold">
                {new Date(patient.registrationDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
