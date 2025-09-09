import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// --- TYPE DEFINITIONS ---
export interface Category {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface TaxRate {
  id: string;
  name: string;
  percentage: number;
}

export interface Products {
  id: string;
  name: string;
  description: string;
  costPrice: number;
  salePrice: number;
  unitOfSale: string;
  sellOnPos: boolean;
  sellOnTill: boolean;
  taxExempt: boolean;
  category: Category;
  brand: Brand;
  taxRate: TaxRate;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProductsResponse {
  data: Products[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface GetProductsParams {
  page: number;
  pageSize: number;
  [key: string]: any;
}

export interface NewProductPayload {
  name: string;
  description: string;
  costPrice: number;
  salePrice: number;
  unitOfSale: string;
  sellOnPos: boolean;
  sellOnTill: boolean;
  taxExempt: boolean;
  categoryId: string;
  brandId: string;
  taxRateId: string;
}

interface UpdateProductsPayload {
  id: string;
  data: Partial<NewProductPayload>;
}

// ✅ Get All Products
export const getAllproducts = createAsyncThunk(
  "products/getAll",
  async (params: GetProductsParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const response = await axios.get(`/api/products?${query}`);
      return response.data as PaginatedProductsResponse;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch products"
      );
    }
  }
);

// ✅ Create Product
export const createproducts = createAsyncThunk(
  "products/create",
  async (payload: NewProductPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/products", payload);
      return response.data as Products;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to create product"
      );
    }
  }
);

// ✅ Update Product
export const updateproducts = createAsyncThunk(
  "products/update",
  async ({ id, data }: UpdateProductsPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/products/${id}`, data);
      return response.data as Products;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update product"
      );
    }
  }
);

// ✅ Delete Product
export const deleteproducts = createAsyncThunk(
  "products/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      return { id, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete product"
      );
    }
  }
);
