import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRoutes } from "../constants/api_routes";
import axios from "axios";

export const getClockingTypes = createAsyncThunk(
  "clocking/getClockingTypes",
  async ({ token }: any, thunkAPI) => {
    try {
      const response = await axios.get(apiRoutes.clockingTypes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Backend Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
export const createClocking = createAsyncThunk(
  "clocking/createClockingType",
  async ({ payload, token }: any, thunkAPI) => {
    console.log("clock" + token);
    try {
      const response = await axios.post(apiRoutes.clockingTypes, payload, {
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

export const updateClockingType = createAsyncThunk(
  "clocking/updateClockingType",
  async ({ id, payload, token }: any, thunkAPI) => {
    try {
      const response = await axios.put(
        `${apiRoutes.clockingTypes}/${id}`,
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

export const deleteClockingType = createAsyncThunk(
  "clocking/deleteClockingType",
  async ({ id, token }: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        apiRoutes.deletClock(id),

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
export const getClockingTypeById = createAsyncThunk(
  "clocking/getClockingType",
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://epos-be.onrender.com/api/v1/clocking-types/${id}`,
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
