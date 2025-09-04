import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define simplified types for our entities
export interface Product {
  id: string;
  name: string;
}
export interface Location {
  id: string;
  name: string;
}
export interface Stock {
  id: string;
  quantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  product: Product;
  location: Location;
}

// Interface for the paginated stock list response
export interface PaginatedStockResponse {
  data: Stock[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// Interface for fetching the stock list
export interface GetStockParams {
  page: number;
  pageSize: number;
  [key: string]: any; 
}

// Payload for creating a new stock record
export interface NewStockPayload {
  productId: string;
//   locationId: string;
  quantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  reorderLevel: number;
}

// Helper to build a query string from a params object
const buildQueryString = (params: GetStockParams): string => {
  const query = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
      query.append(key, String(params[key]));
    }
  }
  return query.toString();
};

// ===== GET All Stock Records =====
export const getAllStock = createAsyncThunk(
  "stock/getAll",
  async (params: GetStockParams, { rejectWithValue }) => {
    try {
      const queryString = buildQueryString(params);
      const response = await axios.get(`/api/stock?${queryString}`);
      return response.data as PaginatedStockResponse;
    } catch (error) {
      return rejectWithValue("Failed to fetch stock records");
    }
  }
);

// ===== CREATE Stock Record =====
export const createStock = createAsyncThunk(
  "stock/create",
  async (payload: NewStockPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/stock", payload);
      return response.data as Stock;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

// ===== GET All Products (for dropdowns) =====
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/products");
      return response.data as Product[];
    } catch (error) {
       return rejectWithValue("Failed to fetch products");
    }
  }
);

// ===== GET All Locations (for dropdowns) =====
export const getAllLocations = createAsyncThunk(
  "locations/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/locations");
      return response.data as Location[];
    } catch (error) {
      return rejectWithValue("Failed to fetch locations");
    }
  }
);