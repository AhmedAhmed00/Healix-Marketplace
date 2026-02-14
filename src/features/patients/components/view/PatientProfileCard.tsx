import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mail, Phone, MapPin, Calendar, DollarSign, Heart } from 'lucide-react'
import { getStatusBadge, getTypeBadge } from '../PatientTableColumns'
import type { Patient } from '../../types'

interface PatientProfileCardProps {
  patient: Patient
  displayName: string
}

export function PatientProfileCard({ patient, displayName }: PatientProfileCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={patient.profileImage} alt={displayName} />
              <AvatarFallback className="bg-linear-to-br from-[#3BC1CF] to-[#1974BB] text-white text-2xl">
                {patient.type === 'organization'
                  ? patient.organizationName?.substring(0, 2).toUpperCase()
                  : `${patient.firstName[0]}${patient.lastName[0]}`}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">{displayName}</h2>
              <p className="text-muted-foreground">{patient.id}</p>
              <div className="flex gap-2 mt-2 justify-center md:justify-start">
                {getTypeBadge(patient.type)}
                {getStatusBadge(patient.accountStatus)}
              </div>
            </div>
          </div>

          {/* Contact and Details */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>
                  {patient.city}, {patient.state} {patient.zipCode}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {new Date(patient.registrationDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-medium">Wallet: ${patient.walletBalance.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Total Spent: ${patient.totalSpent.toFixed(2)}</span>
              </div>
              {patient.dateOfBirth && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                </div>
              )}
              {patient.bloodGroup && (
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Blood: {patient.bloodGroup}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
