import { Card, CardContent } from '@/components/ui/card'
import { DataTable } from '@/components/shared/table'
import { ServiceStatsCards, serviceColumns } from './components'
import { AddServiceDialog } from './components/AddServiceDialog'
import { mockServices } from './data/mockServices'
import { calculateServiceStats } from './data/calculateStats'
import { PageHeader } from '@/components/shared/page-header'
import { Briefcase } from 'lucide-react'
import { AddServiceFormData } from './schemas/service-schema'

export function ServicesPage() {
  const stats = calculateServiceStats(mockServices)

  const handleAddService = (data: AddServiceFormData) => {
    console.log('New service data:', data)
    // TODO: Add service to the database/state
    // For now, we'll just log the data
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <PageHeader
          title="Services Management"
          description="Manage your healthcare services, pricing, and availability"
          icon={Briefcase}
        />
        <AddServiceDialog onSubmit={handleAddService} />
      </div>

      {/* Stats Cards */}
      <ServiceStatsCards stats={stats} />

      {/* Services Table */}
      <Card className="border-none bg-transparent shadow-none hover:shadow-none">
        {/* <CardHeader className='p-0'>
          <CardTitle className="text-[#1974BB]">Services Directory</CardTitle>
          <CardDescription>
            A comprehensive list of all healthcare services with search, filtering, and pagination
          </CardDescription>
        </CardHeader> */}
        <CardContent className='px-0 '>
          <DataTable columns={serviceColumns} data={mockServices} />
        </CardContent>
      </Card>
    </div>
  )
}

export default ServicesPage

