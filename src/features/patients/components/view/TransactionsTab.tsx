import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CreditCard } from 'lucide-react'
import type { PatientTransaction, Patient } from '../../types'

interface TransactionsTabProps {
  transactions: PatientTransaction[]
  patient: Patient
}

export function TransactionsTab({ transactions, patient }: TransactionsTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-3xl">Transaction History</CardTitle>
            <CardDescription>{transactions.length} transactions found</CardDescription>
          </div>
          {/* Current Balance Display */}
          <div className="flex items-center text-center gap-3 p-4 rounded-lg">
            <div>
              <p className="text-muted-foreground font-medium">Current Balance</p>
              <p
                className={`text-4xl font-bold ${patient.walletBalance >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                  }`}
              >
                ${patient.walletBalance.toFixed(2)}
              </p>
              <Badge
                variant={patient.walletBalance >= 0 ? 'default' : 'destructive'}
                className="mt-1 text-xs"
              >
                {patient.walletBalance >= 0 ? 'Positive' : 'Negative'}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No transactions found</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => {
              const isPositive = transaction.type === 'refund' || transaction.type === 'wallet-topup'
              const currentBalance = patient.walletBalance

              return (
                <div key={transaction.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="h-4 w-4 text-blue-500" />
                        <h4 className="font-medium">Transaction #{transaction.id}</h4>
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                          {transaction.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            isPositive
                              ? 'border-green-500 text-green-700 dark:text-green-400'
                              : 'border-red-500 text-red-700 dark:text-red-400'
                          }
                        >
                          {isPositive ? 'Positive' : 'Negative'}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 pl-6">{transaction.description}</p>

                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pl-6">
                        <span className="font-medium">
                          Type: <span className="font-normal capitalize">{transaction.type.replace('-', ' ')}</span>
                        </span>
                        <span className="font-medium">
                          Date:{' '}
                          <span className="font-normal">
                            {new Date(transaction.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </span>
                        {transaction.paymentMethod && (
                          <span className="font-medium">
                            Method: <span className="font-normal">{transaction.paymentMethod}</span>
                          </span>
                        )}
                        {transaction.referenceNumber && (
                          <span className="font-medium">
                            Reference: <span className="font-normal font-mono">{transaction.referenceNumber}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0 space-y-2">
                      <div>
                        <p
                          className={`font-bold text-xl ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}
                        >
                          {isPositive ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {transaction.type === 'refund' ? 'Credited' : transaction.type === 'wallet-topup' ? 'Added' : 'Debited'}
                        </p>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground">Balance</p>
                        <p
                          className={`font-semibold text-sm ${currentBalance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}
                        >
                          ${currentBalance.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
