import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { ClockingType } from "../../../core/interfaces/ClockingType";

interface UpdateClockingTypePayload {
  id: string;
  data: Partial<ClockingType>;
}

export const createClockingType = createAsyncThunk(
  "clockingType/create",
  async (payload: Partial<ClockingType>, thunkAPI) => {
    try {
      const response = await axios.post("/api/clocking-types", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create clocking type"
      );
    }
  }
);

export const getAllClockingTypes = createAsyncThunk(
  "clockingType/getAllClockingTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/clocking-types");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch clocking types"
      );
    }
  }
);

export const getClockingType = createAsyncThunk(
  "clockingType/getClockingType",
  async (clockingTypeId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/clocking-types/${clockingTypeId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch clocking type"
      );
    }
  }
);

export const updateClockingType = createAsyncThunk(
  "clockingType/updateClockingType",
  async ({ id, data }: UpdateClockingTypePayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/clocking-types/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update clocking type"
      );
    }
  }
);

export const deleteClockingType = createAsyncThunk(
  "clockingType/deleteClockingType",
  async (clockingTypeId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/clocking-types/${clockingTypeId}`);
      return { id: clockingTypeId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete clocking type"
      );
    }
  }
);
