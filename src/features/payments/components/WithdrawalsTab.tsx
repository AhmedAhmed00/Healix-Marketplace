import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Withdrawal, BankAccount } from '../types'
import { WithdrawalDialog } from './WithdrawalDialog'
import { DataTable } from '@/components/shared/table'
import { withdrawalTableColumns } from './WithdrawalTableColumns'

interface WithdrawalsTabProps {
  withdrawals: Withdrawal[]
  availableBalance: number
  bankAccounts: BankAccount[]
}

export function WithdrawalsTab({ withdrawals, availableBalance, bankAccounts }: WithdrawalsTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleWithdrawalRequest = (data: any) => {
    console.log('Withdrawal request:', data)
    // Here you would typically send the data to your API
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header with Balance and Action Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
            Available Balance
          </h3>
          <p className="text-4xl font-bold mt-2">
            ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) hover:opacity-90 transition-opacity"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Withdrawal Request
        </Button>
      </div>

      {/* Withdrawals Table */}
      <DataTable columns={withdrawalTableColumns} data={withdrawals} />

      {/* Withdrawal Dialog */}
      <WithdrawalDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleWithdrawalRequest}
        availableBalance={availableBalance}
        bankAccounts={bankAccounts}
      />
    </div>
  )
}

