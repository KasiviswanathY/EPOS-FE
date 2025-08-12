import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoutes } from "../constants/api_routes";

// CREATE Company
export const createCompany = createAsyncThunk(
  "company/create",
  async ({ payload, token }: any, thunkAPI) => {
    try {
      const response = await axios.post(apiRoutes.createCompany, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Backend Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// GET Company
export const getCompany = createAsyncThunk(
  "company/getCompany",
  async ({ token }: { token: string }, thunkAPI) => {
    try {
      const res = await axios.get(apiRoutes.company, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // If backend returns an array, take the first
      return Array.isArray(res.data) ? res.data[0] : res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// UPDATE Company
export const updateCompany = createAsyncThunk(
  "company/update",
  async (
    { id, payload, token }: { id: string; payload: any; token: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.patch(`${apiRoutes.company}/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
