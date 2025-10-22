import { StockMovementReason } from "@/core/interfaces/StockMovementReason";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface UpdateStockMovementReasonPayload {
  id: string;
  data: Partial<StockMovementReason>;
}

// CREATE
export const createStockMovementReason = createAsyncThunk(
  "stockMovementReason/create",
  async (payload: Partial<StockMovementReason>, thunkAPI) => {
    try {
      const response = await axios.post("/api/stock-movement-reasons", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create stock movement reason"
      );
    }
  }
);

// GET ALL
export const getAllStockMovementReasons = createAsyncThunk(
  "stockMovementReason/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/stock-movement-reasons");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch stock movement reasons"
      );
    }
  }
);

// GET ONE
export const getStockMovementReason = createAsyncThunk(
  "stockMovementReason/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/stock-movement-reasons/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch stock movement reason"
      );
    }
  }
);

// UPDATE
export const updateStockMovementReason = createAsyncThunk(
  "stockMovementReason/update",
  async ({ id, data }: UpdateStockMovementReasonPayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/stock-movement-reasons/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update stock movement reason"
      );
    }
  }
);

// DELETE
export const deleteStockMovementReason = createAsyncThunk(
  "stockMovementReason/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/stock-movement-reasons/${id}`);
      return { id, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete stock movement reason"
      );
    }
  }
);
