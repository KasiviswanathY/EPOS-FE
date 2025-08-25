import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


interface UpdateUserload {
  id: string;
  data: Partial<User>;
}
export const patchUser = createAsyncThunk(
  "company/updateCompany",
  async ({ id, data }: UpdateUserload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/users/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update company"
      );
    }
  }
);