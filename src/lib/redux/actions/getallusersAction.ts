import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { apiRoutes } from "@/lib/redux/constants/api_routes";


export const fetchUsersList = createAsyncThunk(
  "users/fetchUsersList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/users");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch companies"
      );
    }
  }
);