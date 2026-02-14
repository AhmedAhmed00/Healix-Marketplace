import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingBag } from 'lucide-react'
import type { PatientOrder } from '../../types'

interface OrdersTabProps {
  orders: PatientOrder[]
}

export function OrdersTab({ orders }: OrdersTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders & Services</CardTitle>
        <CardDescription>{orders.length} orders found</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No orders found</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingBag className="h-4 w-4 text-purple-500" />
                      <h4 className="font-medium">{order.serviceName}</h4>
                      <Badge variant="outline">{order.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Provider: {order.providerName}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                      {order.time && <span>Time: {order.time}</span>}
                      {order.location && <span>Location: {order.location}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${order.amount.toFixed(2)}</p>
                  </div>
                </div>
                {order.notes && <p className="text-sm text-muted-foreground border-t pt-2 mt-2">{order.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
