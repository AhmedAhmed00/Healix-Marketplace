/**
 * Support Stats Cards Component
 * Displays statistics for support tickets
 */

import { Card, CardContent } from '@/components/ui/card'
import { HeadsetIcon, TicketPlus } from 'lucide-react'

interface SupportStats {
  total: number
  open: number
  inProgress: number
  resolved: number
}

interface SupportStatsCardsProps {
  stats: SupportStats
}

export function SupportStatsCards({ stats }: SupportStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-slate-500">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Tickets</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800">
              <HeadsetIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Open</p>
              <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <TicketPlus className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">In Progress</p>
              <p className="text-2xl font-bold text-amber-600">{stats.inProgress}</p>
            </div>
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
              <HeadsetIcon className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-emerald-500">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Resolved</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.resolved}</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
              <HeadsetIcon className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
