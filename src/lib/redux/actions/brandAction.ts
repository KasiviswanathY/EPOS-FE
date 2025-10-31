import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import { Brands }  from "@/core/interfaces/Brands";

interface UpdateBrandPayload {
  id: string;
  data: Partial<Brands>;
}

export const createBrand = createAsyncThunk(
  "company/create",
  async (payload: Partial<Brands>, thunkAPI) => {
    try {
      const response = await axios.post("/api/brands", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create brands"
      );
    }
  }
);

export const getAllBrands = createAsyncThunk(
  "brands/getAllBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/brands");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch brands"
      );
    }
  }
);

export const getBrand = createAsyncThunk(
  "brands/getBrand",
  async (brandId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/brands/${brandId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch brands"
      );
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brands/updateBrand",
  async ({ id, data }: UpdateBrandPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/brands/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update brands"
      );
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (brandId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/brands/${brandId}`);
      return { id: brandId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete brands"
      );
    }
  }
);
