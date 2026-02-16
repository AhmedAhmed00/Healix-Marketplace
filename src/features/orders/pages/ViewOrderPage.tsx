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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getStatusConfig } from "../constants/order-status"
import { useOrder } from "../hooks/use-order"
import FullPageLoading from "@/components/ui/full-page-loading"

export function ViewOrderPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data: order, isLoading, isError } = useOrder(id)

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
                    <Button
                        variant="outline"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        disabled={
                            summary.status === "cancelled" ||
                            summary.status === "delivered"
                        }
                    >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                    </Button>

                    <Button
                        disabled={
                            summary.status !== "pending" &&
                            summary.status !== "confirmed"
                        }
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Accept
                    </Button>
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
        </div>
    )
}
