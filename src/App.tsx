import { Routes, Route, Navigate } from 'react-router'
import { Layout } from './components/Layout'
import { ScrollRestoration } from './components/ScrollRestoration'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import DashboardPage from './features/dashboard'
import ProfilePage from './features/profile'
import OrdersPage from './features/orders'
import PaymentsPage from './features/payments'
import PaymentLogsPage from './features/payment-logs'
import SalesAnalyticsPage from './features/sales-analytics'
import About from './pages/About'
import FormExample from './pages/FormExample'
import UsersTable from './pages/UsersTable'
import ProductsPage from './features/products'
import CategoriesPage from './features/categories'
import AdsPage from './features/ads'
import RolesAndEmployeesPage from './features/roles-and-employees'
import SettingsPage from './features/settings'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOTP from './pages/VerifyOTP'

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <ScrollRestoration />
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
        />
        <Route 
          path="/forgot-password" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <ForgotPassword />} 
        />
        <Route 
          path="/verify-otp" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <VerifyOTP />} 
        />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/payments" element={<PaymentsPage />} />
                  <Route path="/payment-logs" element={<PaymentLogsPage />} />
                  <Route path="/sales-analytics" element={<SalesAnalyticsPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/form" element={<FormExample />} />
                  <Route path="/users" element={<UsersTable />} />
                  <Route path="/products/*" element={<ProductsPage />} />
                  <Route path="/categories/*" element={<CategoriesPage />} />
                  <Route path="/ads/*" element={<AdsPage />} />
                  <Route path="/roles-and-employees/*" element={<RolesAndEmployeesPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App

