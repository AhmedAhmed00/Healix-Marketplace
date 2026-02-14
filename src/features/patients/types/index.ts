export interface Patient {
  id: string
  nationalId?: string
  type: 'individual' | 'organization'
  firstName: string
  lastName: string
  organizationName?: string
  email: string
  phone: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  bloodGroup?: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  profileImage?: string
  accountStatus: 'active' | 'blocked' | 'pending' | 'suspended'
  registrationDate: string
  lastVisit?: string
  walletBalance: number
  totalSpent: number
  dependents?: Dependent[]
  emergencyContact?: EmergencyContact
  insuranceInfo?: InsuranceInfo
  medicalHistory?: string[]
  allergies?: string[]
  currentMedications?: string[]
  rating?: number
  notes?: AdminNote[]
}

export interface Dependent {
  id: string
  name: string
  relationship: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
}

export interface InsuranceInfo {
  provider: string
  policyNumber: string
  expiryDate: string
  coverageAmount: number
}

export interface MedicalRecord {
  id: string
  patientId: string
  title: string
  type: 'prescription' | 'lab-report' | 'scan' | 'document' | 'other'
  uploadedBy: string
  uploadDate: string
  fileUrl: string
  fileSize: number
  description?: string
  providerId?: string
  providerName?: string
}

export interface PatientTransaction {
  id: string
  patientId: string
  type: 'payment' | 'refund' | 'wallet-topup' | 'wallet-deduction'
  amount: number
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  date: string
  description: string
  paymentMethod?: string
  referenceNumber?: string
  serviceId?: string
  serviceName?: string
}

export interface PatientOrder {
  id: string
  patientId: string
  serviceType: string
  serviceName: string
  providerId: string
  providerName: string
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  date: string
  time?: string
  amount: number
  location?: string
  notes?: string
}

export interface AdminNote {
  id: string
  patientId: string
  adminId: string
  adminName: string
  note: string
  createdAt: string
  updatedAt?: string
  priority: 'low' | 'medium' | 'high'
  category?: 'general' | 'medical' | 'financial' | 'behavioral'
}

export interface PatientFeedback {
  id: string
  patientId: string
  providerId: string
  providerName: string
  serviceId: string
  serviceName: string
  rating: number
  comment: string
  date: string
  response?: string
}

export interface PatientStats {
  totalPatients: number
  activePatients: number
  blockedPatients: number
  newThisMonth: number
  totalRevenue: number
  averageRating: number
}

export type PatientFilterStatus = 'all' | 'active' | 'blocked' | 'pending' | 'suspended'
export type PatientFilterType = 'all' | 'individual' | 'organization'

