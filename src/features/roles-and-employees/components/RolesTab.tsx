import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Plus, MoreVertical, Edit, Trash2, Shield } from 'lucide-react'
import { SortableHeader } from '@/components/shared/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'

interface Role {
  id: string
  name: string
  permissions: string[]
  userCount: number
}

const mockRoles: Role[] = [
  {
    id: 'r1',
    name: 'Administrator',
    permissions: ['All Permissions'],
    userCount: 2,
  },
  {
    id: 'r2',
    name: 'Manager',
    permissions: ['View Orders', 'Edit Orders', 'View Reports', 'Manage Products'],
    userCount: 5,
  },
  {
    id: 'r3',
    name: 'Seller',
    permissions: ['View Own Products', 'Edit Own Products', 'View Orders'],
    userCount: 12,
  },
  {
    id: 'r4',
    name: 'Support',
    permissions: ['View Support Tickets', 'Respond to Tickets', 'View Orders'],
    userCount: 3,
  },
]

export function RolesTab() {
  const navigate = useNavigate()
  const [roles, setRoles] = useState<Role[]>(mockRoles)

  const handleDelete = (id: string) => {
    setRoles(roles.filter((r) => r.id !== id))
  }

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column}>Role Name</SortableHeader>,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#1974BB] dark:text-[#3BC1CF]" />
          <div className="font-medium text-[#1974BB] dark:text-[#3BC1CF]">{row.getValue('name')}</div>
        </div>
      ),
    },
    {
      accessorKey: 'permissions',
      header: ({ column }) => <SortableHeader column={column}>Permissions</SortableHeader>,
      cell: ({ row }) => {
        const permissions = row.getValue('permissions') as string[]
        if (!permissions || permissions.length === 0) return <span className="text-muted-foreground">—</span>
        if (permissions[0] === 'All Permissions') {
          return <Badge className="bg-[#3BC1CF] text-white">All Permissions</Badge>
        }
        return (
          <div className="flex flex-wrap gap-1">
            {permissions.slice(0, 3).map((perm) => (
              <Badge key={perm} variant="outline" className="text-xs">
                {perm}
              </Badge>
            ))}
            {permissions.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{permissions.length - 3}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'userCount',
      header: ({ column }) => <SortableHeader column={column}>Users</SortableHeader>,
      cell: ({ row }) => (
        <Badge variant="secondary">{row.getValue('userCount')} users</Badge>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const role = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/roles-and-employees/roles/${role.id}/edit`} className="flex items-center cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(role.id)}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Roles</h3>
          <p className="text-sm text-muted-foreground">
            {roles.length} role{roles.length !== 1 ? 's' : ''} configured
          </p>
        </div>
        <Button
          onClick={() => navigate('/roles-and-employees/roles/add')}
          className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </div>

      <Card className="border-none bg-transparent shadow-none hover:shadow-none">
        <CardContent className="px-0">
          <DataTable columns={columns} data={roles} />
        </CardContent>
      </Card>
    </div>
  )
}
