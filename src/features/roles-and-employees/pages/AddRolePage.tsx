/**
 * AddRolePage Component
 * Full-page route for adding/editing roles
 */

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save } from 'lucide-react'
import { FormCheckbox } from '@/components/shared/FormCheckbox'
import { Separator } from '@/components/ui/separator'

// Permission sections and their permissions
const PERMISSION_SECTIONS = {
  General: [
    'View Dashboard',
    'View Settings',
    'Manage Settings',
  ],
  Products: [
    'View Products',
    'Add Products',
    'Edit Products',
    'Delete Products',
    'Manage Inventory',
    'View Product Analytics',
  ],
  Categories: [
    'View Categories',
    'Add Categories',
    'Edit Categories',
    'Delete Categories',
    'Manage Category Hierarchy',
  ],
  Orders: [
    'View Orders',
    'Process Orders',
    'Cancel Orders',
    'View Order History',
    'Manage Order Status',
  ],
  Payments: [
    'View Payments',
    'Process Payments',
    'Refund Payments',
    'View Payment Logs',
    'Manage Payment Methods',
  ],
  Employees: [
    'View Employees',
    'Add Employees',
    'Edit Employees',
    'Delete Employees',
    'Manage Roles',
    'Assign Permissions',
  ],
  Ads: [
    'View Ads',
    'Create Ads',
    'Edit Ads',
    'Delete Ads',
    'Manage Ad Campaigns',
    'View Ad Analytics',
  ],
  Reports: [
    'View Reports',
    'Export Reports',
    'View Sales Analytics',
    'View Financial Reports',
    'View User Reports',
  ],
}

interface Role {
  id: string
  name: string
  permissions: string[]
}

// Mock data - in real app, this would come from API/state
const mockRoles: Role[] = [
  {
    id: 'r1',
    name: 'Administrator',
    permissions: ['All Permissions'],
  },
  {
    id: 'r2',
    name: 'Manager',
    permissions: ['View Orders', 'Edit Orders', 'View Reports', 'Manage Products'],
  },
]

export function AddRolePage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: '',
    permissions: [] as string[],
  })

  const [isLoading, setIsLoading] = useState(false)

  // Load existing data if editing
  useEffect(() => {
    if (isEditing && id) {
      // In real app, fetch from API
      const existingRole = mockRoles.find((r) => r.id === id)
      if (existingRole) {
        setFormData({
          name: existingRole.name,
          permissions: existingRole.permissions,
        })
      }
    }
  }, [id, isEditing])

  const handlePermissionToggle = (permission: string) => {
    setFormData((prev) => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission]
      return { ...prev, permissions: newPermissions }
    })
  }

  const handleSelectAllInSection = (section: string) => {
    const sectionPermissions = PERMISSION_SECTIONS[section as keyof typeof PERMISSION_SECTIONS]
    const allSelected = sectionPermissions.every((perm) => formData.permissions.includes(perm))

    setFormData((prev) => {
      if (allSelected) {
        // Deselect all in section
        return {
          ...prev,
          permissions: prev.permissions.filter((p) => !sectionPermissions.includes(p)),
        }
      } else {
        // Select all in section
        const newPermissions = [...prev.permissions]
        sectionPermissions.forEach((perm) => {
          if (!newPermissions.includes(perm)) {
            newPermissions.push(perm)
          }
        })
        return { ...prev, permissions: newPermissions }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name?.trim()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In real app, save to API
    console.log('Saving role:', formData)

    setIsLoading(false)
    navigate('/roles-and-employees')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title={isEditing ? 'Edit Role' : 'Add Role'}
          description={isEditing ? 'Update role details and permissions' : 'Create a new role with permissions'}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/roles-and-employees')}
          className="gap-2 border-[#1974BB] dark:border-[#3BC1CF] text-[#1974BB] dark:text-[#3BC1CF] hover:bg-[#1974BB]/10 dark:hover:bg-[#3BC1CF]/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Role Information</CardTitle>
            <CardDescription>
              Enter the role name and configure permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Name */}
            <div className="space-y-2">
              <Label htmlFor="roleName">
                Role Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="roleName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Supervisor, Manager"
                required
              />
            </div>

            <Separator />

            {/* Permissions Configuration */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold">Permissions Configuration</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Select the permissions this role should have access to
                </p>
              </div>

              {Object.entries(PERMISSION_SECTIONS).map(([section, permissions]) => {
                const sectionPermissions = permissions
                const allSelected = sectionPermissions.every((perm) =>
                  formData.permissions.includes(perm)
                )
                const someSelected = sectionPermissions.some((perm) =>
                  formData.permissions.includes(perm)
                )

                return (
                  <Card key={section} className="border-l-4 border-l-[#1974BB] dark:border-l-[#3BC1CF]">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{section}</CardTitle>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleSelectAllInSection(section)}
                          className="text-xs"
                        >
                          {allSelected ? 'Deselect All' : 'Select All'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {permissions.map((permission) => (
                          <FormCheckbox
                            key={permission}
                            id={`perm-${section}-${permission}`}
                            label={permission}
                            checked={formData.permissions.includes(permission)}
                            onCheckedChange={() => handlePermissionToggle(permission)}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Selected Permissions Summary */}
            {formData.permissions.length > 0 && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">
                  Selected Permissions ({formData.permissions.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="text-xs px-2 py-1 bg-background rounded border"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/roles-and-employees')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formData.name?.trim() || isLoading}
                className="gap-2 bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
              >
                <Save className="h-4 w-4" />
                {isLoading ? 'Saving...' : isEditing ? 'Update Role' : 'Add Role'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

export default AddRolePage

