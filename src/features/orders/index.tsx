import { useState, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { OrdersHeader, OrdersTabs, OrdersList } from './components'
import { mockOrders } from './data/mockOrders'
import { filterOrders, sortOrdersByDate, countOrdersByStatus } from './utils'
import type { OrderStatus } from './types'
import { ViewOrderPage } from './pages/ViewOrderPage'
import { useOrders } from './hooks/use-orders'

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all')


  const { data: { count, results } = {}, isError, isFetching, isLoading } = useOrders(activeTab)


  // Filter and sort orders


  // Count orders by status
  const counts = useMemo(() => {
    return countOrdersByStatus(mockOrders)
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
              onTabChange={setActiveTab}
              counts={counts}
            >
              <OrdersList
                orders={results}
                count={count}
                emptyMessage={
                  searchQuery
                    ? 'No orders match your search'
                    : `No ${activeTab === 'all' ? '' : activeTab} orders found`
                }
              />
            </OrdersTabs>
          </div>
        }
      />
      <Route path="view/:id" element={<ViewOrderPage />} />
    </Routes>
  )
}
