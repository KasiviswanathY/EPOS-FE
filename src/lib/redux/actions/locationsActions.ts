import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Location } from "../../../core/interfaces/Location";

interface UpdateLocationPayload {
  id: string;
  data: Partial<Location>;
}

export const createLocation = createAsyncThunk(
  "location/create",
  async (payload: Partial<Location>, thunkAPI) => {
    try {
      const response = await axios.post("/api/locations", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create location"
      );
    }
  }
);

export const getAllLocations = createAsyncThunk(
  "location/getAllLocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/locations");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch locations"
      );
    }
  }
);

export const getLocation = createAsyncThunk(
  "location/getLocation",
  async (locationId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/locations/${locationId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch location"
      );
    }
  }
);

export const updateLocation = createAsyncThunk(
  "location/updateLocation",
  async ({ id, data }: UpdateLocationPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/locations/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update location"
      );
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "location/deleteLocation",
  async (locationId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/locations/${locationId}`);
      return { id: locationId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete location"
      );
    }
  }
);
