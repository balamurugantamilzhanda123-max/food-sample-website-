export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";

export type ReturnStatus =
  | "Requested"
  | "Approved"
  | "Rejected"
  | "Picked Up"
  | "Completed";

export type RefundStatus =
  | "Requested"
  | "Processing"
  | "Completed"
  | "Rejected";

export type Address = {
  id: string;
  label: string;
  recipientName: string;
  mobile: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};

export type OrderItem = {
  id: string;
  productName: string;
  productImage: string;
  variant: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  mobile: string;
  address: Address;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  invoiceUrl?: string;
};

export type ReturnRequest = {
  id: string;
  orderNumber: string;
  customerName: string;
  reason: string;
  status: ReturnStatus;
  createdAt: string;
};

export type RefundRequest = {
  id: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  reason: string;
  status: RefundStatus;
  createdAt: string;
};
