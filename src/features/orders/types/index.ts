
export interface OrderStats {
  total: number
  pending: number
  confirmed: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
}

export interface Order {
  id: number;
  order_items: OrderItem[];
  order_summary: OrderSummary;
  payment_details: PaymentDetails;
  client_information: ClientInformation;
  delivery_information: DeliveryInformation;
  order_status_timeline: OrderStatusTimelineItem[];
  notes: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface OrderItem {
  id: number;
  product: number;
  product_name: string;
  quantity: number;
  unit_price: string;   // kept as string because API returns string
  line_total: string;   // kept as string because API returns string
  notes: string;
}

export interface OrderSummary {
  product: string;
  order_number: string;
  total: string;
  status: OrderStatus;
  placed_at: string; // ISO date string
  items_count: number;
}

export interface PaymentDetails {
  method: PaymentMethod;
  status: PaymentStatus;
  subtotal: string;
  tax_amount: string;
  discount_amount: string;
  total: string;
}

export interface ClientInformation {
  buyer_id: number;
  buyer_type: string;
  name: string;
  email: string;
  phone: string | null;
}

export interface DeliveryInformation {
  address: string;
  estimated_delivery_date: string | null; // ISO date string or null
}

export interface OrderStatusTimelineItem {
  status: OrderStatus;
  is_current: boolean;
  is_completed: boolean;
  timestamp: string | null; // ISO date string or null
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "card" | "cash" | "bank_transfer" | string;

export type PaymentStatus = "paid" | "unpaid" | "failed" | "refunded" | string;
