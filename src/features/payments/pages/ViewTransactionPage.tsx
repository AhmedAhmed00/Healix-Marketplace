import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Receipt,
  Calendar,
  DollarSign,
  User,
  Hash,
  Tag,
  FileText,
} from 'lucide-react'
import { mockTransactions } from '../data/mockPayments'
import type { Transaction } from '../types'

const getStatusVariant = (status: Transaction['status']) => {
  const variants = {
    completed:
      'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800',
    pending:
      'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
    failed:
      'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800',
  }
  return variants[status]
}

export function ViewTransactionPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const transaction = useMemo(
    () => mockTransactions.find((t) => t.id === id),
    [id],
  )

  if (!transaction) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-16 border rounded-xl bg-background/60">
          <Receipt className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Transaction Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The transaction you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => navigate('/payments')}>Back to Payments</Button>
        </div>
      </div>
    )
  }

  const statusClasses = getStatusVariant(transaction.status)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/payments')}
            className="hover:bg-[#3BC1CF]/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-2">
              <Receipt className="h-6 w-6 text-[#1974BB] dark:text-[#3BC1CF]" />
              <span>
                Transaction{' '}
                <span className="font-mono text-lg md:text-2xl">
                  {transaction.transactionId}
                </span>
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {transaction.date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}{' '}
                at{' '}
                {transaction.date.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </p>
          </div>
        </div>

        <Badge
          className={`border text-xs font-semibold capitalize px-3 py-1 ${statusClasses}`}
        >
          {transaction.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Core details */}
          <section className="space-y-4 rounded-xl border bg-background/40 px-4 py-4">
            <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1974BB] dark:text-[#3BC1CF]" />
              Transaction Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">
                  Transaction Number
                </p>
                <p className="font-mono mt-1">{transaction.transactionId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">
                  Reference Number
                </p>
                <p className="font-mono mt-1">
                  {transaction.referenceNumber || '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">
                  Type
                </p>
                <p className="mt-1 capitalize">
                  {transaction.type === 'pay_order' ? 'Pay Order' : transaction.type}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">
                  Status
                </p>
                <p className="mt-1">
                  <Badge className={`text-xs font-medium ${statusClasses}`}>
                    {transaction.status}
                  </Badge>
                </p>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="space-y-3 rounded-xl border bg-background/40 px-4 py-4">
            <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#1974BB] dark:text-[#3BC1CF]" />
              Description
            </h2>
            <p className="text-sm text-muted-foreground">
              {transaction.description || 'No description provided.'}
            </p>
          </section>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          {/* Amount & user */}
          <section className="space-y-4 rounded-xl border bg-background/40 px-4 py-4">
            <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#1974BB] dark:text-[#3BC1CF]" />
              Amount & User
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">
                  Amount
                </p>
                <p className="text-2xl font-bold text-[#1974BB] dark:text-[#3BC1CF] mt-1">
                  ${transaction.amount.toFixed(2)}
                </p>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#3BC1CF]/10 flex items-center justify-center text-xs font-semibold text-[#1974BB]">
                  {(transaction.user || 'User')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    User
                  </p>
                  <p className="text-sm mt-0.5">
                    {transaction.user || 'Unknown user'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Meta */}
          <section className="space-y-4 rounded-xl border bg-background/40 px-4 py-4">
            <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#1974BB] dark:text-[#3BC1CF]" />
              Metadata
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">
                  Date
                </p>
                <p className="mt-0.5">
                  {transaction.date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">
                  Time
                </p>
                <p className="mt-0.5">
                  {transaction.date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

