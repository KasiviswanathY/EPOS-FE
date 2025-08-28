// lib/redux/actions/discountReasonsActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface DiscountReason {
  id: number;
  reason: string;
  defaultValue: number;
}

interface UpdateDiscountReasonPayload {
  id: number;
  data: Partial<DiscountReason>;
}

// ===== CREATE Discount Reason =====
export const createDiscountReason = createAsyncThunk(
  "discountReasons/create",
  async (payload: Partial<DiscountReason>, thunkAPI) => {
    try {
      const response = await axios.post("/api/discount-reasons", payload);
      return response.data; // should return { id, reason, value }
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create discount reason"
      );
    }
  }
);

// ===== GET All Discount Reasons =====
export const getAllDiscountReasons = createAsyncThunk(
  "discountReasons/getAllDiscountReasons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/discount-reasons");
      return response.data; // should return DiscountReason[]
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch discount reasons"
      );
    }
  }
);

// ===== GET Discount Reason By ID =====
export const getDiscountReason = createAsyncThunk(
  "discountReasons/getDiscountReason",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/discount-reasons/${id}`);
      return response.data as DiscountReason;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch discount reason"
      );
    }
  }
);

// ===== UPDATE Discount Reason =====
export const updateDiscountReason = createAsyncThunk(
  "discountReasons/updateDiscountReason",
  async ({ id, data }: UpdateDiscountReasonPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/discount-reasons/${id}, data`);
      return response.data as DiscountReason;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update discount reason"
      );
    }
  }
);

// ===== DELETE Discount Reason =====
export const deleteDiscountReason = createAsyncThunk(
  "discountReasons/deleteDiscountReason",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/discount-reasons/${id}`);
      return { id }; // ✅ return only id, slice handles removal
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete discount reason"
      );
    }
  }
);