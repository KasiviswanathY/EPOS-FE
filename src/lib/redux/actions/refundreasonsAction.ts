import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
export interface RefundReason {
  id: string; 
  description: string;
  shortDescription: string;
  returnToStock: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface NewRefundReasonPayload {
  description: string;
  shortDescription: string;
  returnToStock: boolean;
}
interface UpdateRefundReasonPayload {
  id: string;
  data: {
    description: string;
    shortDescription: string;
    returnToStock: boolean;
  };
}
export const createRefundReason = createAsyncThunk(
  "refundReasons/create",
  async (payload: NewRefundReasonPayload, thunkAPI) => {
    try {
      const response = await axios.post("/api/refund-reasons", payload);
      return response.data as RefundReason;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create refund reason"
      );
    }
  }
);
export const getAllRefundReasons = createAsyncThunk(
  "refundReasons/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/refund-reasons");
      return response.data as RefundReason[];
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch refund reasons"
      );
    }
  }
);

export const updateRefundReason = createAsyncThunk(
  "refundReasons/update",
  async ({ id, data }: UpdateRefundReasonPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/refund-reasons/${id}`, data);
      return response.data as RefundReason;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update refund reason"
      );
    }
  }
);
export const deleteRefundReason = createAsyncThunk(
  "refundReasons/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/refund-reasons/${id}`);
      return { id };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete refund reason"
      );
    }
  }
);