import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {
  PaginatedStockMovements,
  StockMovement,
  StockMovementStats,
  StockMovementType,
} from "@/core/interfaces/StockMovement";

// Interface for creating a stock movement
export interface CreateStockMovementPayload {
  stockId: string;
  type: StockMovementType;
  quantity: number;
  previousQuantity?: number;
  reason?: string;
  reference?: string;
  processedByStaffId?: string;
  processedByUserId?: string;
}

// Interface for updating a stock movement
export interface UpdateStockMovementPayload {
  id: string;
  stockId?: string;
  type?: StockMovementType;
  quantity?: number;
  reason?: string;
  reference?: string;
  processedByStaffId?: string;
  processedByUserId?: string;
}

// Interface for filtering stock movements
export interface StockMovementFilters {
  page?: number;
  limit?: number;
  type?: StockMovementType;
  stockId?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

// Create a single stock movement
export const createStockMovement = createAsyncThunk<
  StockMovement,
  CreateStockMovementPayload
>(
  "stockMovement/create",
  async (payload: CreateStockMovementPayload, thunkAPI) => {
    try {
      const response = await axios.post<StockMovement>("/api/stockMovement", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create stock movement"
      );
    }
  }
);

// Create multiple stock movements in bulk
export const createBulkStockMovements = createAsyncThunk<
  StockMovement[],
  CreateStockMovementPayload[]
>(
  "stockMovement/createBulk",
  async (payloads: CreateStockMovementPayload[], thunkAPI) => {
    try {
      const response = await axios.post<StockMovement[]>("/api/stockMovement/bulk", {
        movements: payloads,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create bulk stock movements"
      );
    }
  }
);

// Get all stock movements with optional filtering
export const getStockMovements = createAsyncThunk<
  PaginatedStockMovements,
  StockMovementFilters
>(
  "stockMovement/getAll",
  async (filters: StockMovementFilters = {}, { rejectWithValue }) => {
    try {
      // Convert filters to query params
      const params = new URLSearchParams();
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.type) params.append('type', filters.type);
      if (filters.stockId) params.append('stockId', filters.stockId);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortDirection) params.append('sortDirection', filters.sortDirection);
      
      const queryString = params.toString();
      const url = queryString ? `/api/stockMovement?${queryString}` : '/api/stockMovement';
      
      const response = await axios.get<PaginatedStockMovements>(url);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch stock movements"
      );
    }
  }
);

// Get stock movements by stock ID
export const getStockMovementsByStockId = createAsyncThunk<
  PaginatedStockMovements,
  string
>(
  "stockMovement/getByStockId",
  async (stockId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<PaginatedStockMovements>(`/api/stockMovement/stock/${stockId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch stock movements"
      );
    }
  }
);

// Get a single stock movement by ID
export const getStockMovementById = createAsyncThunk<
  StockMovement,
  string
>(
  "stockMovement/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<StockMovement>(`/api/stockMovement/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch stock movement"
      );
    }
  }
);

// Update a stock movement
export const updateStockMovement = createAsyncThunk<
  StockMovement,
  UpdateStockMovementPayload
>(
  "stockMovement/update",
  async (payload: UpdateStockMovementPayload, { rejectWithValue }) => {
    try {
      const { id, ...updateData } = payload;
      const response = await axios.put<StockMovement>(`/api/stockMovement/${id}`, updateData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update stock movement"
      );
    }
  }
);

// Delete a stock movement
export const deleteStockMovement = createAsyncThunk<
  { id: string; success: boolean },
  string
>(
  "stockMovement/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete<{ success: boolean }>(`/api/stockMovement/${id}`);
      return { id, ...response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete stock movement"
      );
    }
  }
);

// Get stock movement statistics
export const getStockMovementStats = createAsyncThunk<
  StockMovementStats,
  { stockId?: string; startDate?: string; endDate?: string }
>(
  "stockMovement/getStats",
  async (params, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.stockId) queryParams.append('stockId', params.stockId);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      
      const queryString = queryParams.toString();
      const url = queryString 
        ? `/api/stockMovement/stats?${queryString}` 
        : `/api/stockMovement/stats`;
      
      const response = await axios.get<StockMovementStats>(url);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch stock movement statistics"
      );
    }
  }
);
