import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'doctor' | 'staff'
  /** Vendor / business profile (for marketplace vendor) */
  vendor?: {
    businessName?: string
    phone?: string
    address?: string
    bio?: string
    specialization?: string
    licenseNumber?: string
    yearsOfExperience?: number
    certifications?: string[]
    bankAccountName?: string
    bankAccountMasked?: string
    commissionRate?: number
    paymentTerms?: string
    statistics?: {
      totalBookings: number
      thisMonth: number
      totalRevenue: number
      services: number
    }
  }
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Static user credentials and vendor profile (for demo purposes)
const STATIC_USERS: (Omit<User, 'vendor'> & { password: string; vendor?: User['vendor'] })[] = [
  {
    id: '1',
    email: 'admin@healix.com',
    password: 'admin123',
    name: 'Dr. Admin',
    role: 'admin',
    vendor: {
      businessName: 'Healix Admin Store',
      phone: '+1 (555) 100-2000',
      address: '100 Admin Plaza, Suite 1, Austin, TX 78701',
      bio: 'Platform administrator and vendor account.',
      specialization: 'Platform Operations',
      licenseNumber: 'BUS-ADMIN-001',
      yearsOfExperience: 3,
      certifications: ['Verified Admin', 'Platform Manager'],
      bankAccountName: 'Healix Admin',
      bankAccountMasked: '****-****-****-1000',
      commissionRate: 10,
      paymentTerms: 'Payouts every 14 days',
      statistics: { totalBookings: 1250, thisMonth: 48, totalRevenue: 156000, services: 42 },
    },
  },
  {
    id: '2',
    email: 'doctor@healix.com',
    password: 'doctor123',
    name: 'Dr. Smith',
    role: 'doctor',
    vendor: {
      businessName: 'Smith Medical Supplies',
      phone: '+1 (555) 987-6543',
      address: '1200 Commerce Way, Suite 300, Austin, TX 78701',
      bio: 'Trusted supplier of medical and wellness products with fast shipping and reliable support.',
      specialization: 'Medical & Wellness',
      licenseNumber: 'BUS-REG-2020-49218',
      yearsOfExperience: 5,
      certifications: ['Top Rated Seller', 'Verified Business', 'Fast Shipping Badge'],
      bankAccountName: 'Smith Medical LLC',
      bankAccountMasked: '****-****-****-8294',
      commissionRate: 12,
      paymentTerms: 'Payouts every 7 days',
      statistics: { totalBookings: 18452, thisMonth: 312, totalRevenue: 842300, services: 125 },
    },
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('healix_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('healix_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const foundUser = STATIC_USERS.find(
      u => u.email === email && u.password === password
    )

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        vendor: foundUser.vendor,
      }
      setUser(userData)
      localStorage.setItem('healix_user', JSON.stringify(userData))
      return { success: true }
    }

    return { success: false, error: 'Invalid email or password' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('healix_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

