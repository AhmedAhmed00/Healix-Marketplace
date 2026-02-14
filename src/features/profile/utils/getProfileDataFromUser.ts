import type { User } from '@/contexts/AuthContext'
import type { ProfileData } from '../types'

const DEFAULT_STATISTICS: ProfileData['statistics'] = {
  totalBookings: 0,
  thisMonth: 0,
  totalRevenue: 0,
  services: 0,
}

/**
 * Builds ProfileData for the profile page from the logged-in vendor (User).
 * Uses auth user name/email and optional vendor profile; fills missing fields with defaults.
 */
export function getProfileDataFromUser(user: User | null): ProfileData | null {
  if (!user) return null

  const v = user.vendor
  return {
    fullName: v?.businessName ?? user.name,
    serviceProviderType: 'Online Marketplace Vendor',
    specialization: v?.specialization ?? 'Vendor',
    bio: v?.bio,
    email: user.email,
    phone: v?.phone ?? '—',
    address: v?.address ?? '—',
    licenseNumber: v?.licenseNumber ?? '—',
    yearsOfExperience: v?.yearsOfExperience ?? 0,
    certifications: v?.certifications,
    bankAccountName: v?.bankAccountName ?? '—',
    bankAccount: v?.bankAccountMasked ?? '—',
    commissionRate: v?.commissionRate ?? 0,
    paymentTerms: v?.paymentTerms ?? '—',
    statistics: v?.statistics ?? DEFAULT_STATISTICS,
  }
}
