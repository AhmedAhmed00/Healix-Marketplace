import { useState, useMemo, useEffect } from 'react'
import { Routes, Route, useSearchParams } from 'react-router-dom'
import { format } from 'date-fns'
import { OrdersHeader, OrdersTabs, OrdersList, OrderFilters } from './components'
import type { OrderStatus } from './types'
import { ViewOrderPage } from './pages/ViewOrderPage'
import { useOrders } from './hooks/use-orders'

type PaymentStatusFilter = 'unpaid' | 'paid' | 'partially_paid' | 'failed' | 'refunded' | 'all'

export default function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  
  // Initialize activeTab from URL or default to 'all'
  const statusParam = searchParams.get('status')
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>(
    (statusParam as OrderStatus | 'all') || 'all'
  )

  // Get filter values from URL params
  const paymentStatusFilter = (searchParams.get('payment_status') || 'all') as PaymentStatusFilter
  const startDateParam = searchParams.get('start_date')
  const endDateParam = searchParams.get('end_date')
  const minTotal = searchParams.get('min_total') || ''
  const maxTotal = searchParams.get('max_total') || ''

  const startDate = startDateParam ? new Date(startDateParam) : undefined
  const endDate = endDateParam ? new Date(endDateParam) : undefined

  const { data: { count, results } = {}, isError, isFetching, isLoading } = useOrders(activeTab)

  // Update activeTab when URL changes
  useEffect(() => {
    const statusParam = searchParams.get('status')
    const newTab = (statusParam as OrderStatus | 'all') || 'all'
    if (newTab !== activeTab) {
      setActiveTab(newTab)
    }
  }, [searchParams])

  // Update URL when activeTab changes
  const handleTabChange = (tab: OrderStatus | 'all') => {
    setActiveTab(tab)
    const newParams = new URLSearchParams(searchParams)
    if (tab === 'all') {
      newParams.delete('status')
    } else {
      newParams.set('status', tab)
    }
    // Reset to page 1 when changing tabs
    newParams.set('page', '1')
    setSearchParams(newParams)
  }

  const handlePaymentStatusChange = (status: PaymentStatusFilter) => {
    const newParams = new URLSearchParams(searchParams)
    if (status === 'all') {
      newParams.delete('payment_status')
    } else {
      newParams.set('payment_status', status)
    }
    newParams.set('page', '1')
    setSearchParams(newParams)
  }

  const handleStartDateChange = (date: Date | undefined) => {
    const newParams = new URLSearchParams(searchParams)
    if (date) {
      newParams.set('start_date', format(date, 'yyyy-MM-dd'))
    } else {
      newParams.delete('start_date')
    }
    newParams.set('page', '1')
    setSearchParams(newParams)
  }

  const handleEndDateChange = (date: Date | undefined) => {
    const newParams = new URLSearchParams(searchParams)
    if (date) {
      newParams.set('end_date', format(date, 'yyyy-MM-dd'))
    } else {
      newParams.delete('end_date')
    }
    newParams.set('page', '1')
    setSearchParams(newParams)
  }

  const handleMinTotalChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set('min_total', value)
    } else {
      newParams.delete('min_total')
    }
    newParams.set('page', '1')
    setSearchParams(newParams)
  }

  const handleMaxTotalChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set('max_total', value)
    } else {
      newParams.delete('max_total')
    }
    newParams.set('page', '1')
    setSearchParams(newParams)
  }

  const handleClearFilters = () => {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('payment_status')
    newParams.delete('start_date')
    newParams.delete('end_date')
    newParams.delete('min_total')
    newParams.delete('max_total')
    newParams.set('page', '1')
    setSearchParams(newParams)
  }

  // Count orders by status - using API data if available
  const counts = useMemo(() => {
    // If we have API data, we could calculate counts from results
    // For now, return empty counts since we're using server-side filtering
    return {
      all: 0,
      pending: 0,
      confirmed: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    } as Record<OrderStatus | 'all', number>
  }, [])

  return (
    <Routes>
      <Route
        index
        element={
          <div className="space-y-6">
            <OrdersHeader />

            <OrdersTabs
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              counts={counts}
            >
              <div className="space-y-4">
                <OrderFilters
                  paymentStatusFilter={paymentStatusFilter}
                  startDate={startDate}
                  endDate={endDate}
                  minTotal={minTotal}
                  maxTotal={maxTotal}
                  onPaymentStatusChange={handlePaymentStatusChange}
                  onStartDateChange={handleStartDateChange}
                  onEndDateChange={handleEndDateChange}
                  onMinTotalChange={handleMinTotalChange}
                  onMaxTotalChange={handleMaxTotalChange}
                  onClearFilters={handleClearFilters}
                />
                <OrdersList
                  orders={results}
                  count={count}
                  isLoading={isLoading || isFetching}
                  emptyMessage={
                    searchQuery
                      ? 'No orders match your search'
                      : `No ${activeTab === 'all' ? '' : activeTab} orders found`
                  }
                />
              </div>
            </OrdersTabs>
          </div>
        }
      />
      <Route path="view/:id" element={<ViewOrderPage />} />
    </Routes>
  )
}
