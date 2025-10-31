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
export const createDiscountReason = createAsyncThunk(
  "discountReasons/create",
  async (payload: Partial<DiscountReason>, thunkAPI) => {
    try {
      const response = await axios.post("/api/discount-reasons", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create discount reason"
      );
    }
  }
);
export const getAllDiscountReasons = createAsyncThunk(
  "discountReasons/getAllDiscountReasons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/discount-reasons");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch discount reasons"
      );
    }
  }
);

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
export const updateDiscountReason = createAsyncThunk(
  "discountReasons/updateDiscountReason",
  async ({ id, data }: UpdateDiscountReasonPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/discount-reasons/${id}`, data);
      return response.data as DiscountReason;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update discount reason"
      );
    }
  }
);
export const deleteDiscountReason = createAsyncThunk(
  "discountReasons/deleteDiscountReason",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/discount-reasons/${id}`);
      return { id }; 
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete discount reason"
      );
    }
  }
);