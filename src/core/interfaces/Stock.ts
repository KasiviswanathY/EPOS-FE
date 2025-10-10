import { Product } from "./Products";
import { Location } from "./Location";
import { StockMovement } from "./StockMovement";

export interface Stock {
  id: string;
  quantity: number;
  minStockLevel: number;
  maxStockLevel?: number;
  reorderLevel: number;
  lastRestockDate: string | null;
  isLowStock: boolean;

  product: Product;
  productId: string;

  location: Location;
  locationId: string;

  stockMovements?: StockMovement[];

  createdAt: string;
  updatedAt: string;
}

export interface PaginatedStockResponse {
  data: Stock[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface GetStockParams {
  page: number;
  pageSize: number;
  [key: string]: unknown;
}

export interface NewStockPayload {
  productId: string;
  locationId: string;
  quantity: number;
  minStockLevel: number;
  maxStockLevel?: number;
  reorderLevel: number;
  isLowStock?: boolean;
}
