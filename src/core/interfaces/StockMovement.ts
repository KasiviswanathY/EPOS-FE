import { Stock } from "./Stock";
import { Staff } from "./Staff";
import { User } from "./User";

export type StockMovementType = "IN" | "OUT" | string;

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
}
