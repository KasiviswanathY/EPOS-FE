import { Cateogry } from "@/core/interfaces/Cateogry";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


interface UpdateCateogryPayload {
  id: string;
  data: Partial<Cateogry>;
}

export const createCateogry = createAsyncThunk(
  "company/create",
  async (payload: Partial<Cateogry>, thunkAPI) => {
    try {
      const response = await axios.post("/api/cateogry", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create cateogry"
      );
    }
  }
);

export const getAllCateogry= createAsyncThunk(
  "Cateogry/getAllCateogry",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/cateogry");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch cateogry"
      );
    }
  }
);


export const updateCateogry = createAsyncThunk(
  "cateogry/updateCateogry",
  async ({ id, data }: UpdateCateogryPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/cateogry/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update cateogry"
      );
    }
  }
);

export const deletecateogry= createAsyncThunk(
  "company/deleteCompany",
  async (cateogryId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/cateogry/${cateogryId}`);
      return { id: cateogryId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete cateogry"
      );
    }
  }
);