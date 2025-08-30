import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import {PopUps} from "../../../core/interfaces/PopUps";



interface UpdatepopupsPayload {
  id: string;
  data: Partial<PopUps>;
}

export const createPopup= createAsyncThunk(
  "Popup/create",
  async (payload: Partial<PopUps>, thunkAPI) => {
    try {
      const response = await axios.post("/api/popup", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create Popup"
      );
    }
  }
);

export const getAllPopups = createAsyncThunk(
  "Popup/getAllPopup",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/popup");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch popup"
      );
    }
  }
);
export const getPopups = createAsyncThunk(
  "Popups /getPopups",
  async (PopupsId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/popup/${PopupsId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch popup"
      );
    }
  }
);

export const updatePopups= createAsyncThunk(
  "Popups /updatePopups ",
  async ({ id, data }: UpdatepopupsPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/popup/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update Popups "
      );
    }
  }
);

export const deletePopups  = createAsyncThunk(
  "Popups /deletePopups ",
  async (PopupsId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/popup/${PopupsId}`);
      return { id: PopupsId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete Popups "
      );
    }
  }
);
