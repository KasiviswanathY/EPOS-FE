import { Product } from "./Products";
import { Location } from "./Location";
import { StockMovement } from "./StockMovement";

export interface Stock {
  id: string;
  quantity: number;
  lastRestockDate: string | null;
  product: Product;
  location: Location;
  createdAt: string;
  updatedAt: string;

  minStockLevel?: number;
  maxStockLevel?: number;
  reorderLevel?: number;

  isLowStock: boolean;
  productId: string;
  locationId: string;
  stockMovements?: StockMovement[];
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
  [key: string]: any;
}

export interface NewStockPayload {
  productId: string;
  locationId: string;
  quantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  reorderLevel: number;
}
