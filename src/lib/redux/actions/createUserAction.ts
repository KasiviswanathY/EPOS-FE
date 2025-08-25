import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { apiRoutes } from "../constants/api_routes";


export const createUser = createAsyncThunk(
  "User/create",
  async (payload: Partial<User>, thunkAPI) => {
    try {
      const response = await axios.post("/api/companies", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create User"
      );
    }
  }
);
