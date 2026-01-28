import { useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft,
    Edit,
    Package,
    DollarSign,
    Tag,
    Building2,
    Calendar,
    FileText,
    User,
    MapPin,
    Truck,
    AlertCircle,
    XCircle,
    Phone,
    Mail,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { mockOrders } from '../data/mockOrders'
import { getStatusConfig } from '../constants/order-status'
import { useMemo } from 'react'

export function ViewOrderPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const order = useMemo(() => mockOrders.find((o) => o.id === id), [id])

    if (!order) {
        return (
            <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-16 border rounded-xl bg-background/60">
                    <Package className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                    <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
                    <p className="text-muted-foreground mb-4">
                        The order you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Button onClick={() => navigate('/orders')}>Back to Orders</Button>
                </div>
            </div>
        )
    }

    const statusConfig = getStatusConfig(order.status)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">

                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            <span className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) bg-clip-text text-transparent">
                                #{order.orderNumber}
                            </span>
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        disabled={order.status === 'cancelled' || order.status === 'delivered'}
                    >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                    </Button>
                    <Button
                        className="bg-linear-to-r from-(--brand-gradient-from) to-(--brand-gradient-to) text-white hover:opacity-90"
                        disabled={order.status !== 'pending' && order.status !== 'confirmed'}
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Accept
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Summary */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-[#1974BB] dark:text-[#3BC1CF]" />
                                    Order Summary
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    System tracking and status information
                                </p>
                            </div>
                            <Badge
                                className={`${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} border-2 font-semibold text-sm px-4 py-1.5`}
                            >
                                {statusConfig.icon}
                                <span className="ml-2">{statusConfig.label}</span>
                            </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-xl border bg-background/40 px-4 py-4">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                    Product
                                </p>
                                <p className="text-base md:text-lg font-bold">{order.product}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                    Order Number
                                </p>
                                <p className="text-base md:text-lg font-mono font-medium">{order.orderNumber}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                    Total
                                </p>
                                <p className="text-xl md:text-2xl font-bold text-[#1974BB] dark:text-[#3BC1CF]">
                                    ${order.amount.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Client + shipping */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4 rounded-xl border bg-background/40 px-4 py-4">
                            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase flex items-center gap-2">
                                <User className="w-4 h-4 text-[#1974BB] dark:text-[#3BC1CF]" />
                                Client Information
                            </p>
                            <div className="flex items-center gap-3 ">

                                <div className="space-y-3">
                                    <p className="font-semibold flex items-center gap-2">
                                        <User className="w-4 h-4 text-[#3BC1CF]" />
                                        {order.clientName}
                                    </p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-[#3BC1CF]" />
                                        {order.clientEmail}
                                    </p>

                                    {order.clientPhone && (
                                        <p className="text-sm flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-[#3BC1CF]" />
                                            <span>{order.clientPhone}</span>
                                        </p>
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="space-y-4 rounded-xl border bg-background/40 px-4 py-4">

                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-[#3BC1CF] mt-1 shrink-0" />
                                <div>
                                    <p className="text-xs mb-2 font-semibold text-muted-foreground uppercase">
                                        Delivery Address
                                    </p>
                                    <p className="text-sm mt-1">{order.shippingAddress}</p>
                                </div>
                            </div>
                            {order.trackingNumber && (
                                <>
                                    <Separator />
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                                            Tracking Number
                                        </p>
                                        <p className="text-sm font-mono flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-[#3BC1CF]" />
                                            {order.trackingNumber}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>

                    {/* Items */}
                    <section className="space-y-3 rounded-xl border bg-background/40 px-4 py-4">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase flex items-center gap-2">
                                <Package className="w-4 h-4 text-[#1974BB] dark:text-[#3BC1CF]" />
                                Order Items
                            </p>
                            <span className="text-xs text-muted-foreground">
                                {order.quantity} item{order.quantity > 1 ? 's' : ''}
                            </span>
                        </div>
                        <div className="grid grid-cols-12 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                            <div className="col-span-6">Item</div>
                            <div className="col-span-2 text-right">Qty</div>
                            <div className="col-span-2 text-right">Price</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>
                        <div className="rounded-lg border bg-card/40">
                            <div className="grid grid-cols-12 px-4 py-3 text-sm items-center">
                                <div className="col-span-6">
                                    <p className="font-medium">{order.product}</p>
                                    <p className="text-xs text-muted-foreground">Product ID: {order.productId}</p>
                                </div>
                                <div className="col-span-2 text-right">{order.quantity}</div>
                                <div className="col-span-2 text-right">
                                    ${(order.amount / order.quantity).toLocaleString()}
                                </div>
                                <div className="col-span-2 text-right font-semibold text-[#1974BB] dark:text-[#3BC1CF]">
                                    ${order.amount.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    {/* Payment */}
                    <section className="space-y-4 rounded-xl border bg-background/40 px-4 py-4">
                        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-[#1974BB] dark:text-[#3BC1CF]" />
                            Payment Details
                        </p>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground font-medium">Method</span>
                                <span className="capitalize">{order.paymentMethod.replace('_', ' ')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground font-medium">Status</span>
                                <Badge
                                    variant={order.paymentStatus === 'completed' ? 'default' : 'secondary'}
                                    className="capitalize"
                                >
                                    {order.paymentStatus}
                                </Badge>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Subtotal</span>
                                <span className="font-medium">${order.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg">
                                <span className="font-bold text-[#1974BB] dark:text-[#3BC1CF]">Total</span>
                                <span className="font-bold text-[#1974BB] dark:text-[#3BC1CF]">
                                    ${order.amount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Timeline */}
                    <section className="rounded-xl border bg-background/40 px-4 py-3 space-y-3">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#1974BB] dark:text-[#3BC1CF]" />
                            <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                                Order Status Timeline
                            </h2>
                        </div>
                        <div className="space-y-3 pt-1">
                            {[
                                { key: 'pending', label: 'Order Placed' },
                                { key: 'confirmed', label: 'Order Confirmed' },
                                { key: 'processing', label: 'Processing' },
                                { key: 'shipped', label: 'Shipped' },
                                { key: 'delivered', label: 'Delivered' },
                                { key: 'cancelled', label: 'Cancelled' },
                            ].map((step, index, all) => {
                                const currentIndex = all.findIndex((s) => s.key === order.status)
                                const isCompleted = index < currentIndex && order.status !== 'cancelled'
                                const isCurrent = index === currentIndex

                                const baseDot = 'w-3 h-3 rounded-full border-2 transition-colors duration-150'
                                const dotClass = isCompleted
                                    ? 'bg-emerald-500 border-emerald-500'
                                    : isCurrent
                                        ? 'bg-[#1974BB] border-[#1974BB]'
                                        : 'bg-background border-muted'

                                const rowBg = isCurrent
                                    ? 'bg-[#3BC1CF]/5 border-[#3BC1CF]/40'
                                    : isCompleted
                                        ? 'bg-muted/40 border-muted'
                                        : 'bg-background border-dashed border-muted'

                                return (
                                    <div key={step.key} className="flex items-stretch gap-3">
                                        <div className="flex flex-col items-center pt-1">
                                            <div className={`${baseDot} ${dotClass}`} />
                                            {index < all.length - 1 && (
                                                <div className="w-px flex-1 bg-gradient-to-b from-muted/80 to-transparent mt-1" />
                                            )}
                                        </div>
                                        <div className={`flex-1 rounded-md px-3 py-2.5 border ${rowBg}`}>
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-semibold">
                                                    {step.label}
                                                    {isCurrent && (
                                                        <span className="ml-2 inline-flex items-center rounded-full bg-[#1974BB]/10 px-2 py-0.5 text-[11px] font-medium text-[#1974BB] dark:text-[#3BC1CF]">
                                                            Current status
                                                        </span>
                                                    )}
                                                </p>
                                                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                                    {step.key}
                                                </span>
                                            </div>

                                            <div className="mt-1.5 space-y-1.5 text-xs text-muted-foreground">
                                                {index === 0 && (
                                                    <p>
                                                        Placed on{' '}
                                                        <span className="font-medium">
                                                            {new Date(order.createdAt).toLocaleString()}
                                                        </span>
                                                    </p>
                                                )}
                                                {step.key === 'delivered' && order.status === 'delivered' && (
                                                    <p>
                                                        Delivered on{' '}
                                                        <span className="font-medium">
                                                            {new Date(order.updatedAt).toLocaleString()}
                                                        </span>
                                                    </p>
                                                )}
                                                {step.key === 'cancelled' && order.status === 'cancelled' && (
                                                    <p>
                                                        Cancelled on{' '}
                                                        <span className="font-medium">
                                                            {new Date(order.updatedAt).toLocaleString()}
                                                        </span>
                                                    </p>
                                                )}
                                                {step.key === 'shipped' && order.estimatedDelivery && (
                                                    <p>
                                                        Estimated delivery{' '}
                                                        <span className="font-medium">
                                                            {new Date(order.estimatedDelivery).toLocaleDateString()}
                                                        </span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    {/* Notes */}
                    {order.notes && (
                        <section className="rounded-xl border border-yellow-200 dark:border-yellow-900/40 bg-yellow-50/60 dark:bg-yellow-950/20 px-4 py-3">
                            <div className="flex items-center gap-2 mb-1.5">
                                <AlertCircle className="w-4 h-4 text-yellow-700 dark:text-yellow-400" />
                                <h3 className="text-xs font-semibold tracking-wide text-yellow-800 dark:text-yellow-400 uppercase">
                                    Order Notes
                                </h3>
                            </div>
                            <p className="text-xs text-yellow-700 dark:text-yellow-300 italic">
                                &quot;{order.notes}&quot;
                            </p>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}