import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/table'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Plus, MoreVertical, Edit, Trash2, Users, Shield } from 'lucide-react'
import { SortableHeader } from '@/components/shared/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'

interface Employee {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
  lastLogin?: string
  avatar?: string
}

const mockEmployees: Employee[] = [
  { id: 'u1', name: 'John Smith', email: 'john.smith@marketplace.com', role: 'Administrator', status: 'Active', lastLogin: '2026-01-27T10:30:00' },
  { id: 'u2', name: 'Sarah Johnson', email: 'sarah.j@marketplace.com', role: 'Manager', status: 'Active', lastLogin: '2026-01-27T09:15:00' },
  { id: 'u3', name: 'Michael Brown', email: 'michael.b@marketplace.com', role: 'Seller', status: 'Active', lastLogin: '2026-01-26T16:45:00' },
  { id: 'u4', name: 'Emily Davis', email: 'emily.d@marketplace.com', role: 'Support', status: 'Active', lastLogin: '2026-01-27T08:00:00' },
  { id: 'u5', name: 'David Wilson', email: 'david.w@marketplace.com', role: 'Manager', status: 'Inactive', lastLogin: '2026-01-20T14:20:00' },
]

export function EmployeesTab() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)

  const handleDelete = (id: string) => {
    setEmployees(employees.filter((u) => u.id !== id))
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column}>Employee</SortableHeader>,
      cell: ({ row }) => {
        const employee = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={employee.avatar} alt={employee.name} />
              <AvatarFallback className="bg-[#3BC1CF] text-white text-xs">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{employee.name}</div>
              <div className="text-xs text-muted-foreground">{employee.email}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <SortableHeader column={column}>Role</SortableHeader>,
      cell: ({ row }) => {
        const role = row.getValue('role') as string
        return (
          <Badge variant="outline" className="bg-[#3BC1CF]/10 text-[#1974BB] border-[#3BC1CF]/20">
            <Shield className="w-3 h-3 mr-1" />
            {role}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <Badge
            className={status === 'Active' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-300 dark:border-green-800 border-2' : 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-800 border-2'}
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'lastLogin',
      header: ({ column }) => <SortableHeader column={column}>Last Login</SortableHeader>,
      cell: ({ row }) => {
        const lastLogin = row.getValue('lastLogin') as string | undefined
        if (!lastLogin) return <span className="text-muted-foreground">—</span>
        const date = new Date(lastLogin)
        return (
          <div className="text-sm">
            {date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
            <div className="text-xs text-muted-foreground">
              {date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        )
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const employee = row.original
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
                <Link to={`/roles-and-employees/employees/${employee.id}/edit`} className="flex items-center cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(employee.id)}
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
          <h3 className="text-lg font-semibold">Employees</h3>
          <p className="text-sm text-muted-foreground">
            {employees.length} employee{employees.length !== 1 ? 's' : ''} in the system
          </p>
        </div>
        <Button
          onClick={() => navigate('/roles-and-employees/employees/add')}
          className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <Card className="border-none bg-transparent shadow-none hover:shadow-none">
        <CardContent className="px-0">
          <DataTable columns={columns} data={employees} />
        </CardContent>
      </Card>
    </div>
  )
}
