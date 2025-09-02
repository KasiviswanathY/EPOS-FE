import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Interface for a single stock movement reason
export interface StockMovementReason {
  id: string;
  reason: string;
  createdAt: string;
  updatedAt: string;
}

// Payload for creating a new reason
export interface NewStockMovementReasonPayload {
  reason: string;
}

// Payload for updating an existing reason
interface UpdateStockMovementReasonPayload {
  id: string;
  data: {
    reason: string;
  };
}

// ===== GET All Stock Movement Reasons =====
export const getAllStockMovementReasons = createAsyncThunk(
  "stockMovementReasons/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/stock-movement-reasons");
      return response.data as StockMovementReason[];
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch reasons"
      );
    }
  }
);

// ===== CREATE Stock Movement Reason =====
export const createStockMovementReason = createAsyncThunk(
  "stockMovementReasons/create",
  async (payload: NewStockMovementReasonPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/stock-movement-reasons", payload);
      return response.data as StockMovementReason;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to create reason"
      );
    }
  }
);

// ===== UPDATE Stock Movement Reason =====
export const updateStockMovementReason = createAsyncThunk(
  "stockMovementReasons/update",
  async ({ id, data }: UpdateStockMovementReasonPayload, { rejectWithValue }) => {
    try {
      // ✅ FIX: send `reason` directly, not wrapped inside `data`
      const response = await axios.patch(`/api/stock-movement-reasons/${id}`, {
        reason: data.reason,
      });
      return response.data as StockMovementReason;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update reason"
      );
    }
  }
);

// ===== DELETE Stock Movement Reason =====
export const deleteStockMovementReason = createAsyncThunk(
  "stockMovementReasons/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/stock-movement-reasons/${id}`);
      return { id };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete reason"
      );
    }
  }
);
