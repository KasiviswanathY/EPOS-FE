import { Stock } from "./Stock";
import { Staff } from "./Staff";
import { User } from "./User";

export type StockMovementType =
  | "INITIAL_STOCK"
  | "PURCHASE"
  | "SALE"
  | "ADJUSTMENT"
  | "RETURN"
  | "TRANSFER_IN"
  | "TRANSFER_OUT"
  | "DAMAGED"
  | "EXPIRED";

export interface StockMovement {
  id: string;
  type: StockMovementType;
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason?: string;
  reference?: string;

  stock: Stock;
  stockId: string;

  processedByStaff?: Staff;
  processedByStaffId?: string;

  processedByUser?: User;
  processedByUserId?: string;

  createdAt: string;
  updatedAt?: string;
}

// Response interfaces for API pagination
export interface PaginatedStockMovements {
  data: StockMovement[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Interface for stock movement summary stats
export interface StockMovementStats {
  totalMovements: number;
  totalInQuantity: number;
  totalOutQuantity: number;
  movementsByType: {
    type: StockMovementType;
    count: number;
    totalQuantity: number;
  }[];
}
