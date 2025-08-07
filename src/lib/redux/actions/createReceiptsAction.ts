import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiRoutes } from "../constants/api_routes";

export const createReceipt = createAsyncThunk(
  "receipt/createReceipt",
  async ({ payload, token }: any, thunkAPI) => {
    try {
      const response = await axios.post(
        apiRoutes.createReceipts,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

// GET Company
export const getReceipt = createAsyncThunk(
  "receipt/getReceipt",
  async ({ id,token }: { id: string; token: string }, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://epos-be.onrender.com/api/v1/company-receipts/company/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // If backend returns an array, take the first
      return Array.isArray(res.data) ? res.data[0] : res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// UPDATE Company
export const updateReceipt = createAsyncThunk(
  "receipt/updateReceipt",
  async ({ id, payload, token }: { id: string; payload: any; token: string }, thunkAPI) => {
    try {
      
      const res = await axios.patch(
        `https://epos-be.onrender.com/api/v1/company-receipts/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
