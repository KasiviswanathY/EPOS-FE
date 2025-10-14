import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
export interface NoSaleReason {
  id: string; 
  reason: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewNoSaleReasonPayload {
  reason: string;
}

interface UpdateNoSaleReasonPayload {
  id: string;
  data: {
    reason: string;
  };
}
export const createNoSaleReason = createAsyncThunk(
  "noSaleReasons/create",
  async (payload: NewNoSaleReasonPayload, thunkAPI) => {
    try {
      const response = await axios.post("/api/no-sale-reasons", payload);
      return response.data as NoSaleReason;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create no-sale reason"
      );
    }
  }
);
export const getAllNoSaleReasons = createAsyncThunk(
  "noSaleReasons/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/no-sale-reasons");
      return response.data as NoSaleReason[];
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch no-sale reasons"
      );
    }
  }
);
export const updateNoSaleReason = createAsyncThunk(
  "noSaleReasons/update",
  async ({ id, data }: UpdateNoSaleReasonPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/no-sale-reasons/${id}`, data);
      return response.data as NoSaleReason;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update no-sale reason"
      );
    }
  }
);
export const deleteNoSaleReason = createAsyncThunk(
  "noSaleReasons/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/no-sale-reasons/${id}`);
      return { id };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete no-sale reason"
      );
    }
  }
);