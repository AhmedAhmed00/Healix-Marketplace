import type { ProfileData } from '../types'

export const mockProfileData: ProfileData = {
  // Basic Information
  fullName: "BluePeak Marketplace",
  serviceProviderType: "Online Marketplace Vendor",
  specialization: "Electronics & Home Appliances",
  bio: "Trusted multi‑category seller on BluePeak with a focus on high‑quality electronics and home essentials, delivering fast shipping and reliable customer support.",

  // Contact Information
  email: "support@bluepeak-marketplace.com",
  phone: "+1 (555) 987‑6543",
  address: "1200 Commerce Way, Suite 300, Austin, TX 78701",

  // Professional / Business Information
  licenseNumber: "BUS-REG-2020-49218",
  yearsOfExperience: 5,
  certifications: [
    "Top Rated Seller (Last 24 Months)",
    "Verified Business Account",
    "Fast Shipping Badge"
  ],

  // Financial Information
  bankAccountName: "BluePeak Marketplace LLC",
  bankAccount: "****-****-****-8294",
  commissionRate: 12,
  paymentTerms: "Payouts every 7 days",

  // Store Statistics
  statistics: {
    totalBookings: 18452,      // total orders
    thisMonth: 312,            // orders this month
    totalRevenue: 842300,      // lifetime GMV
    services: 125              // active SKUs / listings
  }
}

