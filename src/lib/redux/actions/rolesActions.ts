import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Role } from "../../../core/interfaces/Role";

interface UpdateRolePayload {
  id: string;
  data: Partial<Role>;
}

export const createRole = createAsyncThunk(
  "role/create",
  async (payload: Partial<Role>, thunkAPI) => {
    try {
      const response = await axios.post("/api/roles", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create role"
      );
    }
  }
);

export const getAllRoles = createAsyncThunk(
  "role/getAllRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/roles");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch roles"
      );
    }
  }
);

export const getRole = createAsyncThunk(
  "role/getRole",
  async (roleId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/roles/${roleId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch role"
      );
    }
  }
);

export const updateRole = createAsyncThunk(
  "role/update",
  async ({ id, data }: UpdateRolePayload, thunkAPI) => {
    try {
      const response = await axios.patch(`/api/roles/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to update role"
      );
    }
  }
);

export const deleteRole = createAsyncThunk(
  "role/delete",
  async (roleId: string, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/roles/${roleId}`);
      return { id: roleId, ...response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to delete role"
      );
    }
  }
);
