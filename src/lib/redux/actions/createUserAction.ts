import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoutes } from "../constants/api_routes";
import { fetchUsersList } from "./getallusersAction";

export const createUser = createAsyncThunk(
  "user/create",
  async ({ payload, token }: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(apiRoutes.users, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // ✅ Refresh list after creation
      dispatch(fetchUsersList());

      return response.data;
    } catch (error: any) {
      console.error("Backend Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data);
    }
  }
);
