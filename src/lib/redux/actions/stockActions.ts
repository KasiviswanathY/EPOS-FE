import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";

import { Stock } from "@/core/interfaces/Stock";


export const createStock = createAsyncThunk(
  "stock/create",
  async (payload: Partial<Stock>, thunkAPI) => {
    try {
      const response = await axios.post("/api/stock", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create Stock"
      );
    }
  }
);

export const getAllstocks = createAsyncThunk(
  "stocks/getAllstocks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/stock");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch Stock"
      );
    }
  }
);

export const getstocks = createAsyncThunk(
  "company/getCompany",
  async (stockId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/stock/${stockId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch company"
      );
    }
  }
);

interface UpdateStockPayload {
  id: string;
  data: {
    minStockLevel: number;
    maxStockLevel: number;
    reorderLevel: number;
  };
}

export const updateStock = createAsyncThunk(
  "stock/updateStock",
  async ({ id, data }: UpdateStockPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/stock/${id}`, {
        minStockLevel: data.minStockLevel,
        maxStockLevel: data.maxStockLevel,
        reorderLevel: data.reorderLevel,
      }); // ✅ only allowed fields
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update Stocks"
      );
    }
  }
);


export const deletestock = createAsyncThunk(
  "company/deletestock",
  async (stockId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/stocks/${stockId}`);
      return { id: stockId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete stockId"
      );
    }
  }
);
