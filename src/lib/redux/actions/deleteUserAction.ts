import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { apiRoutes } from "@/lib/redux/constants/api_routes";
import { fetchUsersList } from "./getallusersAction";

interface DeleteUserPayload {
  id: string;
}

export const deleteUser = createAsyncThunk(
  "users/deleteUSer",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/users/${userId}`);
      return { id: userId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete company"
      );
    }
  }
);
