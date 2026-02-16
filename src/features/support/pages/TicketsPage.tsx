/**
 * Support Tickets Page
 * Displays and manages support tickets
 */

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/table'
import { HeadsetIcon, TicketPlus } from 'lucide-react'
import { supportTicketColumns, AddTicketDialog, SupportStatsCards, TicketFilters } from '../components'
import { mockSupportTickets } from '../data/mockSupport'
import type { TicketStatus, SupportTicket } from '../types'

type StatusFilter = TicketStatus | 'all'

export function TicketsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)
  const [showAddTicketDialog, setShowAddTicketDialog] = useState(false)
  const [tickets, setTickets] = useState<SupportTicket[]>(mockSupportTickets)

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
      const ticketDate = new Date(ticket.createdAt)
      const matchesDateFrom = !dateFrom || ticketDate >= dateFrom
      const matchesDateTo = !dateTo || ticketDate <= new Date(dateTo.getTime() + 24 * 60 * 60 * 1000 - 1)
      return matchesStatus && matchesDateFrom && matchesDateTo
    })
  }, [tickets, statusFilter, dateFrom, dateTo])

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    inProgress: tickets.filter((t) => t.status === 'in_progress').length,
    resolved: tickets.filter((t) => t.status === 'resolved').length,
  }), [tickets])

  const handleAddTicket = (ticketData: Partial<SupportTicket>, attachments: File[]) => {
    const newTicket: SupportTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber: `TKT-${new Date().getFullYear()}-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: ticketData.subject || '',
      description: ticketData.description || '',
      ticketType: ticketData.ticketType || 'general',
      status: 'open',
      priority: 'medium',
      clientName: 'Admin User',
      clientEmail: 'admin@healix.com',
      userType: 'staff',
      responsibleEmployee: 'Unassigned',
      responsibleEmployeeId: '',
      attachments: attachments.map((file, index) => ({
        id: `attach-${Date.now()}-${index}`,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
      })),
      communicationLog: [
        {
          id: `log-${Date.now()}`,
          senderName: 'System',
          senderRole: 'system',
          message: 'Ticket created',
          date: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setTickets((prev) => [newTicket, ...prev])
  }

  const clearFilters = () => {
    setStatusFilter('all')
    setDateFrom(undefined)
    setDateTo(undefined)
  }

  return (
    <div className="space-y-6">
      <SupportStatsCards stats={stats} />

      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
                Support Tickets
              </CardTitle>
              <Button
                onClick={() => setShowAddTicketDialog(true)}
                className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white"
              >
                <TicketPlus className="mr-2 h-4 w-4" />
                Add Ticket
              </Button>
            </div>

            <TicketFilters
              statusFilter={statusFilter}
              dateFrom={dateFrom}
              dateTo={dateTo}
              onStatusChange={setStatusFilter}
              onDateFromChange={setDateFrom}
              onDateToChange={setDateTo}
              onClearFilters={clearFilters}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
              <HeadsetIcon className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">
                No tickets found with the selected filters
              </p>
              <Button
                variant="link"
                onClick={clearFilters}
                className="text-[rgb(var(--brand-primary))] mt-2"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <DataTable columns={supportTicketColumns} data={filteredTickets} />
          )}
        </CardContent>
      </Card>

      <AddTicketDialog
        open={showAddTicketDialog}
        onOpenChange={setShowAddTicketDialog}
        onAddTicket={handleAddTicket}
      />
    </div>
  )
}
