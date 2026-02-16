import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    Edit,
    Package,
    DollarSign,
    Calendar,
    FileText,
    User,
    MapPin,
    AlertCircle,
    XCircle,
    Phone,
    Mail,
    Loader2,
    CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getStatusConfig } from "../constants/order-status"
import { useOrder } from "../hooks/use-order"
import { acceptOrder, rejectOrder } from "../api/orders-api"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import FullPageLoading from "@/components/ui/full-page-loading"

export function ViewOrderPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [isAccepting, setIsAccepting] = useState(false)
    const [isRejecting, setIsRejecting] = useState(false)
    const [showRejectDialog, setShowRejectDialog] = useState(false)

    const { data: order, isLoading, isError, refetch } = useOrder(id)

    if (isLoading) {
        return <FullPageLoading resource="Order" />
    }

    if (isError || !order) {
        return (
            <div className="flex flex-col items-center justify-center py-16 border rounded-xl">
                <Package className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
                <Button onClick={() => navigate("/orders")}>
                    Back to Orders
                </Button>
            </div>
        )
    }

    const summary = order.order_summary
    const payment = order.payment_details
    const client = order.client_information
    const delivery = order.delivery_information
    const items = order.order_items
    const timeline = order.order_status_timeline

    const statusConfig = getStatusConfig(summary.status)

    const handleAccept = async () => {
        if (!id || !order) return

        setIsAccepting(true)
        try {
            await acceptOrder(id)
            toast.success('Order accepted successfully')
            // Refetch order data and invalidate orders list
            await refetch()
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            queryClient.invalidateQueries({ queryKey: ['order', id] })
        } catch (error: any) {
            console.error('Error accepting order:', error)
            const errorMessage = error?.response?.data?.message || error?.response?.data?.detail || 'Failed to accept order'
            toast.error(errorMessage)
        } finally {
            setIsAccepting(false)
        }
    }

    const handleReject = async () => {
        if (!id || !order) return

        setIsRejecting(true)
        try {
            await rejectOrder(id)
            toast.success('Order rejected successfully')
            setShowRejectDialog(false)
            // Refetch order data and invalidate orders list
            await refetch()
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            queryClient.invalidateQueries({ queryKey: ['order', id] })
        } catch (error: any) {
            console.error('Error rejecting order:', error)
            const errorMessage = error?.response?.data?.message || error?.response?.data?.detail || 'Failed to reject order'
            toast.error(errorMessage)
        } finally {
            setIsRejecting(false)
        }
    }

    const canAccept = summary.status === 'pending' || summary.status === 'confirmed'
    const canReject = summary.status === 'pending' || summary.status === 'confirmed'

    return (
        <div className="space-y-6">
            {/* ================= HEADER ================= */}
            <div className="flex items-center justify-between border-b pb-4">
                <div>
                    <h1 className="text-3xl font-bold">
                        #{summary.order_number}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Placed on{" "}
                        {new Date(summary.placed_at).toLocaleDateString()}
                    </p>
                </div>

                <div className="flex gap-3">
                    {canReject && (
                        <Button
                            variant="outline"
                            className="text-red-500 border-red-200 hover:bg-red-50"
                            onClick={() => setShowRejectDialog(true)}
                            disabled={isRejecting || isAccepting}
                        >
                            {isRejecting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Rejecting...
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                </>
                            )}
                        </Button>
                    )}

                    {canAccept && (
                        <Button
                            onClick={handleAccept}
                            disabled={isAccepting || isRejecting}
                            className="bg-[rgb(var(--brand-primary))] hover:opacity-90"
                        >
                            {isAccepting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Accepting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Accept
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ================= LEFT SIDE ================= */}
                <div className="lg:col-span-2 space-y-8">
                    {/* -------- ORDER SUMMARY -------- */}
                    <section className="space-y-4 rounded-xl border p-4">
                        <div className="flex justify-between items-center">
                            <p className="text-xs uppercase font-semibold flex items-center gap-2 text-muted-foreground">
                                <FileText className="w-4 h-4" />
                                Order Summary
                            </p>

                            <Badge
                                className={`${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} border-2 px-4 py-1`}
                            >
                                {statusConfig.icon}
                                <span className="ml-2">
                                    {statusConfig.label}
                                </span>
                            </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-xs uppercase text-muted-foreground">
                                    Product
                                </p>
                                <p className="font-bold">
                                    {summary.product}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase text-muted-foreground">
                                    Order Number
                                </p>
                                <p className="font-mono">
                                    {summary.order_number}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase text-muted-foreground">
                                    Total
                                </p>
                                <p className="text-xl font-bold text-primary">
                                    ${Number(payment.total).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* -------- CLIENT + DELIVERY -------- */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="rounded-xl border p-4 space-y-3">
                            <p className="text-xs uppercase font-semibold text-muted-foreground flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Client Information
                            </p>

                            <p className="font-semibold">{client.name}</p>
                            <p className="text-sm flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {client.email}
                            </p>

                            {client.phone && (
                                <p className="text-sm flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    {client.phone}
                                </p>
                            )}
                        </div>

                        <div className="rounded-xl border p-4 space-y-3">
                            <p className="text-xs uppercase font-semibold text-muted-foreground flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Delivery Information
                            </p>

                            <p>{delivery.address}</p>

                            {delivery.estimated_delivery_date && (
                                <p className="text-sm text-muted-foreground">
                                    Estimated delivery:{" "}
                                    {new Date(
                                        delivery.estimated_delivery_date
                                    ).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </section>

                    {/* -------- ORDER ITEMS -------- */}
                    <section className="rounded-xl border p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-xs uppercase font-semibold flex items-center gap-2 text-muted-foreground">
                                <Package className="w-4 h-4" />
                                Order Items
                            </p>
                            <span className="text-xs text-muted-foreground">
                                {summary.items_count} item
                                {summary.items_count > 1 && "s"}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-12 text-sm items-center border-b pb-2"
                                >
                                    <div className="col-span-6">
                                        <p className="font-medium">
                                            {item.product_name}
                                        </p>
                                    </div>

                                    <div className="col-span-2 text-right">
                                        {item.quantity}
                                    </div>

                                    <div className="col-span-2 text-right">
                                        ${Number(item.unit_price).toLocaleString()}
                                    </div>

                                    <div className="col-span-2 text-right font-semibold">
                                        ${Number(item.line_total).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className="space-y-6">
                    {/* -------- PAYMENT -------- */}
                    <section className="rounded-xl border p-4 space-y-4">
                        <p className="text-xs uppercase font-semibold flex items-center gap-2 text-muted-foreground">
                            <DollarSign className="w-4 h-4" />
                            Payment Details
                        </p>

                        <div className="text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>Method</span>
                                <span className="capitalize">
                                    {payment.method.replace("_", " ")}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Status</span>
                                <Badge className="capitalize">
                                    {payment.status}
                                </Badge>
                            </div>

                            <Separator />

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>
                                    ${Number(payment.subtotal).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>
                                    ${Number(payment.tax_amount).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Discount</span>
                                <span>
                                    -$
                                    {Number(
                                        payment.discount_amount
                                    ).toLocaleString()}
                                </span>
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>
                                    ${Number(payment.total).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* -------- TIMELINE -------- */}
                    <section className="rounded-xl border p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <h2 className="text-xs uppercase font-semibold text-muted-foreground">
                                Order Status Timeline
                            </h2>
                        </div>

                        {timeline.map((step) => (
                            <div key={step.status} className="border p-3 rounded-md">
                                <div className="flex justify-between items-center">
                                    <p className="capitalize font-semibold">
                                        {step.status}
                                    </p>

                                    {step.timestamp && (
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(
                                                step.timestamp
                                            ).toLocaleString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* -------- NOTES -------- */}
                    {order.notes && (
                        <section className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-4 h-4 text-yellow-600" />
                                <h3 className="text-xs uppercase font-semibold text-yellow-700">
                                    Order Notes
                                </h3>
                            </div>

                            <p className="text-sm italic text-yellow-700">
                                "{order.notes}"
                            </p>
                        </section>
                    )}
                </div>
            </div>

            {/* Reject Confirmation Dialog */}
            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                            <XCircle className="h-5 w-5" />
                            Reject Order
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to reject this order? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            <div className="font-semibold mb-1">Order #{summary.order_number}</div>
                            <div className="text-sm">
                                Client: {client.name}
                                <br />
                                Total: ${Number(payment.total).toLocaleString()}
                            </div>
                        </AlertDescription>
                    </Alert>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowRejectDialog(false)}
                            disabled={isRejecting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleReject}
                            disabled={isRejecting}
                        >
                            {isRejecting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Rejecting...
                                </>
                            ) : (
                                <>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Reject Order
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
