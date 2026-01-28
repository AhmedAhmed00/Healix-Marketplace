import { Order } from '../types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Calendar, Clock, DollarSign } from 'lucide-react'

interface ConfirmedAppointmentsProps {
  appointments: Order[]
}

export function ConfirmedAppointments({ appointments }: ConfirmedAppointmentsProps) {
  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-linear-to-br from-[#1974BB] to-[#3BC1CF] 
            shadow-lg shadow-[#3BC1CF]/20 dark:shadow-[#3BC1CF]/30">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-[#1974BB] dark:text-[#3BC1CF]">
              Confirmed Orders
            </CardTitle>
            <CardDescription>
              {appointments.length} confirmed orders ready
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <CheckCircle2 className="h-10 w-10 mx-auto mb-2 opacity-50 
                text-[#1974BB] dark:text-[#3BC1CF]" />
              <p className="text-sm">No confirmed orders</p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 rounded-lg 
                  bg-linear-to-r from-[#3BC1CF]/10 to-[#1974BB]/10 
                  dark:from-[#3BC1CF]/5 dark:to-[#1974BB]/5
                  border border-[#3BC1CF]/20 
                  dark:border-[#3BC1CF]/20
                  hover:border-[#3BC1CF]/40 
                  dark:hover:border-[#3BC1CF]/30
                  hover:shadow-md hover:shadow-[#3BC1CF]/10
                  dark:hover:shadow-[#3BC1CF]/20
                  transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full 
                    bg-linear-to-br from-[#1974BB] to-[#3BC1CF] 
                    flex items-center justify-center text-white text-sm font-semibold
                    shadow-lg shadow-[#3BC1CF]/20 dark:shadow-[#3BC1CF]/30">
                    {appointment.clientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-[#1974BB]/80 dark:text-[#3BC1CF]">
                      {appointment.clientName}
                    </p>
                    <p className="text-xs text-[#1974BB] dark:text-[#3BC1CF]">
                      {appointment.product}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-[#1974BB] dark:text-[#3BC1CF] mb-1">
                    <DollarSign className="h-3 w-3" />
                    <span className="font-semibold">${appointment.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#1974BB]/80 dark:text-[#3BC1CF]/80">
                    <Calendar className="h-3 w-3" />
                    {new Date(appointment.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

