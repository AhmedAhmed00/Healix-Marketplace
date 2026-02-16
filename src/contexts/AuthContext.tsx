import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

import { loginUser } from "@/features/authentication/api/auth" 
import { Vendor } from "@/features/authentication/types"

export interface AuthUser extends Vendor {}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // ✅ Restore session on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("healix_vendor")
    const token = localStorage.getItem("access_token")

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("healix_vendor")
      }
    }

    setIsLoading(false)
  }, [])

  // ✅ Real Login
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const payload: LoginRequest = { email, password }

      const data = await loginUser(payload)
      // data = { vendor, access, refresh }

      // Store tokens
      localStorage.setItem("access_token", data.access)
      localStorage.setItem("refresh_token", data.refresh)

      // Store vendor
      localStorage.setItem(
        "healix_vendor",
        JSON.stringify(data.vendor)
      )

      setUser(data.vendor)

      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Login failed",
      }
    }
  }

  // ✅ Logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("healix_vendor")
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
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
