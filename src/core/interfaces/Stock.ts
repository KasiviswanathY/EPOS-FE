export interface Product {
  id: string;
  name: string;
  salePrice: number;
  costPrice: number;
  category?: {
    name: string;
  };
}

export interface Location {
  id: string;
  name: string;
}

export interface Stock {
  id: string;
  quantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  reorderLevel: number;
  isLowStock: boolean;
  lastRestockDate: string | null;
  product: Product;
  location: Location;
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
