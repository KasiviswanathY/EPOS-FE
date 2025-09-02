
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Interface for a single customer type object
export interface CustomerType {
  id: string;
  name: string;
  description: string;
  discount: number;
  createdAt: string;
  updatedAt: string;
}

// Payload for creating a new customer type
export interface NewCustomerTypePayload {
  name: string;
  description: string;
  discount: number;
}

// Payload for updating an existing customer type
interface UpdateCustomerTypePayload {
  id: string;
  data: Partial<NewCustomerTypePayload>;
}

// ===== GET All Customer Types =====
export const getAllCustomerTypes = createAsyncThunk(
  "customerTypes/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/customer-types");
      return response.data as CustomerType[];
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch customer types"
      );
    }
  }
);

// ===== CREATE Customer Type =====
export const createCustomerType = createAsyncThunk(
  "customerTypes/create",
  async (payload: NewCustomerTypePayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/customer-types", payload);
      return response.data as CustomerType;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to create customer type"
      );
    }
  }
);

// ===== UPDATE Customer Type =====
export const updateCustomerType = createAsyncThunk(
  "customerTypes/update",
  async ({ id, data }: UpdateCustomerTypePayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/customer-types/${id}`, data);
      return response.data as CustomerType;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update customer type"
      );
    }
  }
);

// ===== DELETE Customer Type =====
export const deleteCustomerType = createAsyncThunk(
  "customerTypes/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/customer-types/${id}`);
      return { id };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete customer type"
      );
    }
  }
);