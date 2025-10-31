import { CustomerType } from "@/core/interfaces/CustomerType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface UpdateCustomerTypePayload {
  id: string;
  data: Partial<CustomerType>;
}

// CREATE
export const createCustomerType = createAsyncThunk(
  "customerType/create",
  async (payload: Partial<CustomerType>, thunkAPI) => {
    try {
      const response = await axios.post("/api/customer-types", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create customer type"
      );
    }
  }
);

// GET ALL
export const getAllCustomerTypes = createAsyncThunk(
  "customerType/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/customer-types");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch customer types"
      );
    }
  }
);

// GET BY ID
export const getCustomerType = createAsyncThunk(
  "customerType/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/customer-types/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch customer type"
      );
    }
  }
);

export const updateCustomerType = createAsyncThunk(
  "customerType/update",
  async ({ id, data }: UpdateCustomerTypePayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/customer-types/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "Update error:",
        axiosError.response?.data || axiosError.message
      );
      return rejectWithValue(
        axiosError.response?.data || "Failed to update customer type"
      );
    }
  }
);


// DELETE
export const deleteCustomerType = createAsyncThunk(
  "customerType/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/customer-types/${id}`);
      return { id, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete customer type"
      );
    }
  }
);
