import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Interface for a TaxRate
export interface TaxRate {
  id: string;
  name: string;
  percentage: number;
  createdAt: string;
  updatedAt: string;
}

// API response structure (paginated)
export interface PaginatedTaxRatesResponse {
  data: TaxRate[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// Create Tax Rate Payload
export interface NewTaxRatePayload {
  name: string;
  percentage: number;
}

// Update Tax Rate Payload
interface UpdateTaxRatePayload {
  id: string;
  data: Partial<NewTaxRatePayload>;
}

// ===== GET All Tax Rates with Pagination =====
export const getAllTaxRates = createAsyncThunk(
  "taxRates/getAll",
  async (_, { rejectWithValue })=> {
    try {
      const response = await axios.get("/api/tax-rates", {
      });
      return response.data as PaginatedTaxRatesResponse;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch tax rates"
      );
    }
  }
);

// ===== CREATE Tax Rate =====
export const createTaxRate = createAsyncThunk(
  "taxRates/create",
  async (payload: NewTaxRatePayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/tax-rates", payload);
      return response.data as TaxRate;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to create tax rate"
      );
    }
  }
);

// ===== UPDATE Tax Rate =====
export const updateTaxRate = createAsyncThunk(
  "taxRates/update",
  async ({ id, data }: UpdateTaxRatePayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/tax-rates/${id}`, data);
      return response.data as TaxRate;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update tax rate"
      );
    }
  }
);

// ===== DELETE Tax Rate =====
export const deleteTaxRate = createAsyncThunk(
  "taxRates/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/tax-rates/${id}`);
      return { id };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete tax rate"
      );
    }
  }
);
