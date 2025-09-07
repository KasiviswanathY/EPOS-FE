export interface OrderItem {
  id?: string;
  productId: string;
  quantity: number;
  price: number;
  taxRate: number;
  totalPrice?: number;
}

export interface Order {
  id?: string;
  orderNumber: string;
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  orderDate: string;
  totalAmount: number;
  subTotal: number;
  taxAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod:
    | "CASH"
    | "CARD"
    | "POINTS"
    | "DEPOSIT"
    | "CHEQUE"
    | "GIFT_CARD"
    | "SCAN"
    | "PAY_LATER"
    | "EXTERNAL"
    | "SPLIT_BILL";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  notes?: string;
  customerId?: string;
  locationId: string;
  processedByStaffId?: string;
  processedByUserId?: string;
  createdAt?: string;
  updatedAt?: string;
}
