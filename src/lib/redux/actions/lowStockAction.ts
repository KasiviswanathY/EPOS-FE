import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const getAllLowStocks = createAsyncThunk(
  "lowStocks/getAlllowStocks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/lowStocks");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetchlowStocks"
      );
    }
  }
);
export const deleteLowStock = createAsyncThunk(
  "location/deleteLowStock",
  async (locationId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/lowStocks/${locationId}`);
      return { id: locationId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete location"
      );
    }
  }
);
