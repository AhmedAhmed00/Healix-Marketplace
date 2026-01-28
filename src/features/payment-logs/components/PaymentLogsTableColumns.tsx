import { ColumnDef } from '@tanstack/react-table'
import { PaymentLog } from '../types'
import { Badge } from '@/components/ui/badge'
import { SortableHeader } from '@/components/shared/table'
import { CreditCard, Building2, CheckCircle, Clock, XCircle, RotateCcw } from 'lucide-react'

const getPaymentProviderIcon = (provider: PaymentLog['paymentProvider']) => {
  switch (provider) {
    case 'credit_card':
      return <CreditCard className="w-3 h-3" />
    case 'paypal':
      return <Building2 className="w-3 h-3" />
    case 'stripe':
      return <CreditCard className="w-3 h-3" />
    case 'square':
      return <CreditCard className="w-3 h-3" />
    case 'bank_transfer':
      return <Building2 className="w-3 h-3" />
    default:
      return <CreditCard className="w-3 h-3" />
  }
}

const getPaymentProviderLabel = (provider: PaymentLog['paymentProvider']) => {
  switch (provider) {
    case 'credit_card':
      return 'Credit Card'
    case 'paypal':
      return 'PayPal'
    case 'stripe':
      return 'Stripe'
    case 'square':
      return 'Square'
    case 'bank_transfer':
      return 'Bank Transfer'
    default:
      return provider
  }
}

const getStatusConfig = (status: PaymentLog['status']) => {
  switch (status) {
    case 'completed':
      return {
        label: 'Completed',
        icon: <CheckCircle className="w-3 h-3" />,
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        color: 'text-green-700 dark:text-green-400',
        borderColor: 'border-green-300 dark:border-green-800',
      }
    case 'pending':
      return {
        label: 'Pending',
        icon: <Clock className="w-3 h-3" />,
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        color: 'text-yellow-700 dark:text-yellow-400',
        borderColor: 'border-yellow-300 dark:border-yellow-800',
      }
    case 'failed':
      return {
        label: 'Failed',
        icon: <XCircle className="w-3 h-3" />,
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        color: 'text-red-700 dark:text-red-400',
        borderColor: 'border-red-300 dark:border-red-800',
      }
    case 'refunded':
      return {
        label: 'Refunded',
        icon: <RotateCcw className="w-3 h-3" />,
        bgColor: 'bg-gray-50 dark:bg-gray-900/20',
        color: 'text-gray-700 dark:text-gray-400',
        borderColor: 'border-gray-300 dark:border-gray-800',
      }
    case 'processing':
      return {
        label: 'Processing',
        icon: <Clock className="w-3 h-3" />,
        bgColor: 'bg-[#3BC1CF]/10 dark:bg-[#3BC1CF]/20',
        color: 'text-[#1974BB] dark:text-[#3BC1CF]',
        borderColor: 'border-[#3BC1CF]/30 dark:border-[#3BC1CF]/50',
      }
    default:
      return {
        label: status,
        icon: <Clock className="w-3 h-3" />,
        bgColor: 'bg-gray-50 dark:bg-gray-900/20',
        color: 'text-gray-700 dark:text-gray-400',
        borderColor: 'border-gray-300 dark:border-gray-800',
      }
  }
}

export const paymentLogsColumns: ColumnDef<PaymentLog>[] = [
  {
    accessorKey: 'paymentId',
    header: ({ column }) => <SortableHeader column={column} title="Payment" />,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="font-medium text-[#1974BB] dark:text-[#3BC1CF]">
          {payment.paymentId}
        </div>
      )
    },
  },
  {
    accessorKey: 'orderNumber',
    header: ({ column }) => <SortableHeader column={column} title="Order" />,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <div className="font-medium">
          {payment.orderNumber}
        </div>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <SortableHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number
      return (
        <div className="font-semibold text-[#1974BB] dark:text-[#3BC1CF]">
          ${amount.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: 'paymentProvider',
    header: ({ column }) => <SortableHeader column={column} title="Payment Provider" />,
    cell: ({ row }) => {
      const provider = row.getValue('paymentProvider') as PaymentLog['paymentProvider']
      return (
        <div className="flex items-center gap-2">
          {getPaymentProviderIcon(provider)}
          <span className="font-medium">{getPaymentProviderLabel(provider)}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status') as PaymentLog['status']
      const config = getStatusConfig(status)
      return (
        <Badge className={`${config.bgColor} ${config.color} ${config.borderColor} border-2 font-semibold text-sm px-3 py-1`}>
          {config.icon} {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <SortableHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'))
      return (
        <div className="text-sm">
          <div>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          <div className="text-xs text-muted-foreground">{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      )
    },
  },
]
