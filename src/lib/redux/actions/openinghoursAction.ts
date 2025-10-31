import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { OpeningHour } from "@/core/interfaces/OpeningHours";

// CREATE
export const createOpeningHour = createAsyncThunk(
  "openingHours/create",
  async (payload: Partial<OpeningHour>, thunkAPI) => {
    try {
      const response = await axios.post("/api/opening-hours", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create opening hour"
      );
    }
  }
);

// GET ALL
export const getAllOpeningHours = createAsyncThunk(
  "openingHours/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/opening-hours");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to fetch opening hours"
      );
    }
  }
);

// UPDATE
export const updateOpeningHour = createAsyncThunk(
  "openingHours/update",
  async (
    { id, data }: { id: string; data: Partial<OpeningHour> },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(`/api/opening-hours/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to update opening hour"
      );
    }
  }
);

// DELETE
export const deleteOpeningHour = createAsyncThunk(
  "openingHours/delete",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`/api/opening-hours/${id}`);
      return id;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to delete opening hour"
      );
    }
  }
);
