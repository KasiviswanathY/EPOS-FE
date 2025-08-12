import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoutes } from "@/lib/redux/constants/api_routes";

export const fetchUsersList = createAsyncThunk(
  "app/fetchUsersList",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.app.token;
      if (!token) {
        return rejectWithValue("Token is missing from Redux state");
      }
      console.log("Fetching users with token:", token);
      const response = await axios.get(apiRoutes.users, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch user list"
      );
    }
  }
);
