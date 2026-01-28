import {
  DashboardStats,
  UpcomingAppointments,
  ConfirmedAppointments,
  QuickActions,
  RevenueChart,
  OrderStatusesChart,
  MostPaidOrdersChart
} from './components'
import {
  dashboardStats,
  upcomingOrders,
  confirmedOrders
} from './data/mockData'

export function DashboardPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
          Welcome back! Here's what's happening with your marketplace today.
        </p>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={dashboardStats} />

      {/* Charts Section - Top Row */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <RevenueChart />
        <OrderStatusesChart />
      </div>

      {/* Charts Section - Bottom Row */}
      <div className="grid gap-4 md:gap-6 grid-cols-1">
        <MostPaidOrdersChart />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Upcoming Orders - Takes 2 columns */}
        <div className="lg:col-span-2">
          <UpcomingAppointments appointments={upcomingOrders} />
        </div>

        {/* Confirmed Orders - Takes 1 column */}
        <div className="lg:col-span-1">
          <ConfirmedAppointments appointments={confirmedOrders} />
        </div>
      </div>

    </div>
  )
}

export default DashboardPage

