import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// --- TYPE DEFINITIONS ---

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

interface UpdateStockPayload {
  id: string;
  data: Partial<NewStockPayload>;
}

// --- NEW: Adjust Stock Payload ---
export interface AdjustStockPayload {
  id: string; // stockId
  type: "PURCHASE" | "SALE" | "CORRECTION" | "TRANSFER"; // adjust type
  quantity: number;
  reason?: string;
  reference?: string;
}

// --- HELPERS ---
const buildQueryString = (params: GetStockParams): string => {
  return new URLSearchParams(params as any).toString();
};

// --- ASYNC THUNKS ---

// CREATE
export const createStock = createAsyncThunk(
  "stock/create",
  async (payload: NewStockPayload, thunkAPI) => {
    try {
      const response = await axios.post("/api/stock", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create stock"
      );
    }
  }
);

// GET ALL (Paginated)
export const getAllStock = createAsyncThunk(
  "stock/getAll",
  async (params: GetStockParams, { rejectWithValue }) => {
    try {
      const queryString = buildQueryString(params);
      const response = await axios.get(`/api/stock?${queryString}`);
      return response.data as PaginatedStockResponse;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch stock records"
      );
    }
  }
);

// UPDATE
export const updateStock = createAsyncThunk(
  "stock/update",
  async ({ id, data }: UpdateStockPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/stock/${id}`, data);
      return response.data as Stock;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update stock record"
      );
    }
  }
);

// DELETE
export const deleteStock = createAsyncThunk(
  "stock/delete",
  async (stockId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/stock/${stockId}`);
      return { id: stockId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete stock record"
      );
    }
  }
);

// ✅ ADJUST STOCK (NEW)
export const adjustStock = createAsyncThunk(
  "stock/adjust",
  async (payload: AdjustStockPayload, { rejectWithValue }) => {
    try {
      const { id, ...adjustData } = payload;
      const response = await axios.post(`/api/stock/${id}/adjust`, adjustData);
      return response.data as Stock;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to adjust stock"
      );
    }
  }
);

// --- EXTRA: For dropdowns (Products & Locations) ---

export const getAllProducts = createAsyncThunk(
  "products/getAllForDropdown",
  async (params: GetStockParams, { rejectWithValue }) => {
    try {
      const queryString = buildQueryString(params);
      const response = await axios.get(`/api/products?${queryString}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch products"
      );
    }
  }
);

export const getAllLocations = createAsyncThunk(
  "locations/getAllForDropdown",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/locations");
      return response.data as Location[];
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch locations"
      );
    }
  }
);
