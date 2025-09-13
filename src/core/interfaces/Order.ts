export interface OrderItem {
  id?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountAmount?: number;
  taxAmount?: number;
  productId: string;
  orderId?: string;
  promotions?: Promotion[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Promotion {
  id: string;
  name: string;
  discountType: string;
  discountValue: number;
}

export interface Order {
  id?: string;
  orderNumber: string;
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REFUNDED";
  orderDate: string;
  totalAmount: number;
  subTotal: number;
  taxAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: "CASH" | "CARD" | "CREDIT" | "BANK_TRANSFER" | "MOBILE_PAYMENT";
  paymentStatus: "PENDING" | "PAID" | "PARTIAL" | "FAILED" | "REFUNDED";
  notes?: string;
  customerId?: string;
  locationId: string;
  processedByStaffId?: string;
  processedByUserId?: string;
  orderItems?: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
}
