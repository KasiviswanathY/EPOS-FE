import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoutes } from "../constants/api_routes";

export const createUser = createAsyncThunk(
  "user/create",
  async ({ payload, token }: any, thunkAPI) => {
    try {
      const response = await axios.post(
        apiRoutes.createUser,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // ✅ Set token here
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Backend Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
