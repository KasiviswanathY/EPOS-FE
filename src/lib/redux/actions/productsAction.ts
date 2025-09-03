import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import { Company } from "../../../core/interfaces/Company";
import { Products } from "@/core/interfaces/Products";

interface UpdateproductsPayload {
  id: string;
  data: Partial<Products>;
}

export const createproducts = createAsyncThunk(
  "products/create",
  async (payload: Partial<Products>, thunkAPI) => {
    try {
      const response = await axios.post("/api/products", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create products"
      );
    }
  }
);

export const getAllproducts = createAsyncThunk(
  "products/getAllproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/products");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch products"
      );
    }
  }
);

export const getproducts = createAsyncThunk(
  "products/getproducts",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch comproductspany"
      );
    }
  }
);

export const updateproducts = createAsyncThunk(
  "products/updateproducts",
  async ({ id, data }: UpdateproductsPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/products/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update products"
      );
    }
  }
);

export const deleteproducts = createAsyncThunk(
  "products/deleteproducts",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      return { id: productId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete products"
      );
    }
  }
);
