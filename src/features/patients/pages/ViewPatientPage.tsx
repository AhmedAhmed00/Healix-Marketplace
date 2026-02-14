import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  Users,
  FileText,
  CreditCard,
  ShoppingBag,
  MessageSquare,
  StickyNote,
} from 'lucide-react'
import {
  mockPatients,
  mockMedicalRecords,
  mockPatientTransactions,
  mockPatientOrders,
  mockPatientFeedback,
} from '../data/mockPatients'
import {
  PatientHeader,
  PatientProfileCard,
  OverviewTab,
  MedicalRecordsTab,
  TransactionsTab,
  OrdersTab,
  FeedbackTab,
  NotesTab,
} from '../components/view'

export default function ViewPatientPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // Find the patient
  const patient = mockPatients.find((p) => p.id === id)

  // Handlers
  const handleDownloadRecord = (record: any) => {
    console.log('Downloading record:', record.title)
    alert(`Downloading: ${record.title}\nFile: ${record.fileUrl}`)
  }

  const handleViewRecord = (record: any) => {
    console.log('Viewing record:', record.title)
    alert(`Opening: ${record.title}`)
  }

  // Patient not found
  if (!patient) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate('/patients')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Patients
        </Button>
        <Card className="p-8">
          <div className="text-center">
            <p className="text-muted-foreground">Patient not found</p>
          </div>
        </Card>
      </div>
    )
  }

  // Get display name
  const displayName =
    patient.type === 'organization'
      ? patient.organizationName
      : `${patient.firstName} ${patient.lastName}`

  // Filter data by patient ID
  const patientRecords = mockMedicalRecords.filter((r) => r.patientId === id)
  const patientTransactions = mockPatientTransactions.filter((t) => t.patientId === id)
  const patientOrders = mockPatientOrders.filter((o) => o.patientId === id)
  const patientFeedback = mockPatientFeedback.filter((f) => f.patientId === id)

  const isBlocked = patient.accountStatus === 'blocked'

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <PatientHeader isBlocked={isBlocked} />

      {/* Patient Profile Card */}
      <PatientProfileCard patient={patient} displayName={displayName} />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="justify-start h-auto p-1 bg-transparent rounded-xl flex-wrap gap-2 w-full">
          <TabsTrigger
            value="overview"
            className="relative border border-border px-4 md:px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Info</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="medical"
            className="relative border border-border px-4 md:px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Medical Records</span>
              <span className="sm:hidden">Medical</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 dark:bg-black/20">
                {patientRecords.length}
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="relative border border-border px-4 md:px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Transactions</span>
              <span className="sm:hidden">Trans</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 dark:bg-black/20">
                {patientTransactions.length}
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="relative border border-border px-4 md:px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Orders</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 dark:bg-black/20">
                {patientOrders.length}
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="feedback"
            className="relative border border-border px-4 md:px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Feedback</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 dark:bg-black/20">
                {patientFeedback.length}
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className="relative border border-border px-4 md:px-6 py-3 rounded-lg font-semibold transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              <StickyNote className="w-4 h-4" />
              <span>Notes</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="overview" className="space-y-4 mt-6">
          <OverviewTab patient={patient} />
        </TabsContent>

        <TabsContent value="medical" className="mt-6">
          <MedicalRecordsTab
            records={patientRecords}
            onView={handleViewRecord}
            onDownload={handleDownloadRecord}
          />
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <TransactionsTab transactions={patientTransactions} patient={patient} />
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <OrdersTab orders={patientOrders} />
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <FeedbackTab feedback={patientFeedback} />
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <NotesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
