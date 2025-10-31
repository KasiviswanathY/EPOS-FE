import { Devices } from "@/core/interfaces/Devices";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface UpdateDevicePayload {
  id: string;
  data: Partial<Devices>;
}

// CREATE
export const createDevice = createAsyncThunk(
  "device/create",
  async (payload: Partial<Devices>, thunkAPI) => {
    try {
      const response = await axios.post("/api/devices", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create device"
      );
    }
  }
);

// GET ALL
export const getAllDevices = createAsyncThunk(
  "device/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/devices");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch devices"
      );
    }
  }
);

// GET ONE
export const getDevice = createAsyncThunk(
  "device/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/devices/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch device"
      );
    }
  }
);

// UPDATE
export const updateDevice = createAsyncThunk(
  "device/update",
  async ({ id, data }: UpdateDevicePayload, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/devices/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update device"
      );
    }
  }
);

// DELETE
export const deleteDevice = createAsyncThunk(
  "device/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/devices/${id}`);
      return { id, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete device"
      );
    }
  }
);
