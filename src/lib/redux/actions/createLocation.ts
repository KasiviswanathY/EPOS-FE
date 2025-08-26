import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { apiRoutes } from "../constants/api_routes";

import {
  deleteLocationSuccess,
  updateLocationSuccess,
} from "@/lib/redux/slices/authSlice";
import { Locations } from "@/core/interfaces/Locations";


interface UpdateLocationPayload {
  id: string;
  data: Partial<Locations>;
}

export const createLocations = createAsyncThunk(
  "location/createLocations",
  async (payload: Partial<Locations>, thunkAPI) => {
    try {
      const response = await axios.post("api/locations", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create location"
      );
    }
  }
);

export const getLocations = createAsyncThunk(
  "locations/getLocations",
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


export const updateLocation = createAsyncThunk(
  "locations/updatelocation",
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