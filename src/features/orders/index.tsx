import { useState, useMemo } from 'react'
import { OrdersHeader, OrdersTabs, OrdersList } from './components'
import { mockOrders } from './data/mockOrders'
import { filterOrders, sortOrdersByDate, countOrdersByStatus } from './utils'
import type { OrderStatus } from './types'

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all')

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    const filtered = filterOrders(mockOrders, {
      status: activeTab,
      search: searchQuery,
    })
    return sortOrdersByDate(filtered, 'desc')
  }, [searchQuery, activeTab])

  // Count orders by status
  const counts = useMemo(() => {
    return countOrdersByStatus(mockOrders)
  }, [])

  return (
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
          orders={filteredOrders}
          emptyMessage={
            searchQuery
              ? 'No orders match your search'
              : `No ${activeTab === 'all' ? '' : activeTab} orders found`
          }
        />
      </OrdersTabs>
    </div>
  )
}
