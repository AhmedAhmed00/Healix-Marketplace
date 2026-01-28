/**
 * Roles and Employees Page
 * Manage users, roles, and employee information
 */

import { Routes, Route, useLocation } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Users } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { RolesTab } from './components/RolesTab'
import { EmployeesTab } from './components/EmployeesTab'
import { AddRolePage } from './pages/AddRolePage'
import { AddUserPage } from './pages/AddUserPage'

export function RolesAndEmployeesPage() {
  const location = useLocation()
  
  const isAddRolePage = location.pathname.includes('/roles-and-employees/roles/add') || 
                        location.pathname.includes('/roles-and-employees/roles/')
  const isAddEmployeePage = location.pathname.includes('/roles-and-employees/employees/add') || 
                            location.pathname.includes('/roles-and-employees/employees/')

  return (
    <div>
      {!isAddRolePage && !isAddEmployeePage && (
        <div className="space-y-6">
          <PageHeader
            title="Roles & Employees"
            description="Manage users, roles, and employee information"
            icon={Users}
          />

          {/* Main Tabs */}
          <Tabs defaultValue="roles" className="space-y-6">
            <TabsList className="justify-start h-auto p-1 bg-transparent rounded-xl flex-1 flex-wrap gap-2">
              <TabsTrigger
                value="roles"
                className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Roles</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="employees"
                className="relative border border-border px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Employees</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="roles" className="space-y-6">
              <RolesTab />
            </TabsContent>

            <TabsContent value="employees" className="space-y-6">
              <EmployeesTab />
            </TabsContent>
          </Tabs>
        </div>
      )}

      <Routes>
        <Route path="roles/add" element={<AddRolePage />} />
        <Route path="roles/:id/edit" element={<AddRolePage />} />
        <Route path="employees/add" element={<AddUserPage />} />
        <Route path="employees/:id/edit" element={<AddUserPage />} />
      </Routes>
    </div>
  )
}

export default RolesAndEmployeesPage

