import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OverviewTab, TransactionHistoryTab, WithdrawalsTab } from './components'
import { paymentStats, mockPayments, mockWithdrawals, mockTransactions, mockBankAccounts } from './data/mockPayments'
import { Wallet, Receipt, CreditCard } from 'lucide-react'

export function PaymentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
          Payments
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your earnings, track transactions history, and request withdrawals.
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="wallet" className="space-y-6">
        <div className="flex items-center justify-between w-full gap-4">
          <TabsList className="justify-start h-auto p-1 bg-transparent rounded-xl flex-1 flex-wrap gap-2">
            <TabsTrigger
              value="wallet"
              className="relative border border-border px-6 py-3 rounded-lg font-semibold gap-2 transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
            >
              <Wallet className="h-4 w-4" />
              <span>Wallet</span>
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="relative border border-border px-6 py-3 rounded-lg font-semibold gap-2 transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
            >
              <Receipt className="h-4 w-4" />
              <span>Transactions History</span>
            </TabsTrigger>
            <TabsTrigger
              value="withdrawals"
              className="relative border border-border px-6 py-3 rounded-lg font-semibold gap-2 transition-all data-[state=active]:bg-linear-to-r data-[state=active]:from-(--brand-gradient-from) data-[state=active]:to-(--brand-gradient-to) data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-accent"
            >
              <CreditCard className="h-4 w-4" />
              <span>Withdrawals</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="wallet" className="space-y-6">
          <OverviewTab
            stats={paymentStats}
            recentTransactions={mockPayments}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <TransactionHistoryTab transactions={mockTransactions} />
        </TabsContent>

        <TabsContent value="withdrawals" className="space-y-6">
          <WithdrawalsTab
            withdrawals={mockWithdrawals}
            availableBalance={paymentStats.availableBalance}
            bankAccounts={mockBankAccounts}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PaymentsPage

