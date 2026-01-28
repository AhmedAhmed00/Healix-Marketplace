import { useState, useMemo } from 'react'
import { PaymentLogsHeader, PaymentLogsList, PaymentLogsSearch } from './components'
import { mockPaymentLogs } from './data/mockPaymentLogs'
import { filterPaymentLogs, sortPaymentLogsByDate } from './utils'
import { Card, CardContent } from '@/components/ui/card'

export default function PaymentLogsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter and sort payment logs
  const filteredPaymentLogs = useMemo(() => {
    const filtered = filterPaymentLogs(mockPaymentLogs, {
      search: searchQuery,
    })
    return sortPaymentLogsByDate(filtered, 'desc')
  }, [searchQuery])

  return (
    <div className="space-y-6">
      <PaymentLogsHeader />
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <PaymentLogsSearch value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>
          
          <PaymentLogsList
            paymentLogs={filteredPaymentLogs}
            emptyMessage={
              searchQuery
                ? 'No payment logs match your search'
                : 'No payment logs found'
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}
