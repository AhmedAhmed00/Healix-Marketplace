import React from 'react'
import { CheckCircle, Clock, Package, Truck, CircleCheckBig, XCircle } from 'lucide-react'
import type { OrderStatus } from '../types'

export interface StatusConfig {
  label: string
  icon: JSX.Element
  bgColor: string
  color: string
  borderColor: string
}

export const STATUS_CONFIGS: Record<OrderStatus, StatusConfig> = {
  pending: {
    label: 'Pending',
    icon: <Clock className="w-3 h-3" />,
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    color: 'text-yellow-700 dark:text-yellow-400',
    borderColor: 'border-yellow-300 dark:border-yellow-800',
  },
  confirmed: {
    label: 'Confirmed',
    icon: <CheckCircle className="w-3 h-3" />,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    color: 'text-blue-700 dark:text-blue-400',
    borderColor: 'border-blue-300 dark:border-blue-800',
  },
  processing: {
    label: 'Processing',
    icon: <Package className="w-3 h-3" />,
    bgColor: 'bg-[#3BC1CF]/10 dark:bg-[#3BC1CF]/20',
    color: 'text-[#1974BB] dark:text-[#3BC1CF]',
    borderColor: 'border-[#3BC1CF]/30 dark:border-[#3BC1CF]/50',
  },
  shipped: {
    label: 'Shipped',
    icon: <Truck className="w-3 h-3" />,
    bgColor: 'bg-[#1974BB]/10 dark:bg-[#1974BB]/20',
    color: 'text-[#1974BB] dark:text-[#3BC1CF]',
    borderColor: 'border-[#1974BB]/30 dark:border-[#1974BB]/50',
  },
  delivered: {
    label: 'Delivered',
    icon: <CircleCheckBig className="w-3 h-3" />,
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    color: 'text-green-700 dark:text-green-400',
    borderColor: 'border-green-300 dark:border-green-800',
  },
  cancelled: {
    label: 'Cancelled',
    icon: <XCircle className="w-3 h-3" />,
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    color: 'text-red-700 dark:text-red-400',
    borderColor: 'border-red-300 dark:border-red-800',
  },
}

export function getStatusConfig(status: OrderStatus): StatusConfig {
  return STATUS_CONFIGS[status]
}

export const TAB_CONFIGS = [
  { value: 'all', label: 'All Orders' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
] as const
