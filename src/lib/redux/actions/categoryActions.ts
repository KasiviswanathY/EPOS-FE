import { Cateogry } from "@/core/interfaces/Cateogry";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const createCateogry = createAsyncThunk(
  "company/create",
  async (payload: Partial<Cateogry>, thunkAPI) => {
    try {
      const response = await axios.post("/api/cateogry", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create company"
      );
    }
  }
);
