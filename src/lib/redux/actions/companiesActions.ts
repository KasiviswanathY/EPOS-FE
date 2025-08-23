import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import { Company } from "../../../core/interfaces/Company";

interface UpdateCompanyPayload {
  id: string;
  data: Partial<Company>;
}

export const createCompany = createAsyncThunk(
  "company/create",
  async (payload: Partial<Company>, thunkAPI) => {
    try {
      const response = await axios.post("/api/companies", payload);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data || "Failed to create company"
      );
    }
  }
);

export const getAllCompanies = createAsyncThunk(
  "company/getAllCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/companies");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch companies"
      );
    }
  }
);

export const getCompany = createAsyncThunk(
  "company/getCompany",
  async (companyId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/companies/${companyId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to fetch company"
      );
    }
  }
);

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ id, data }: UpdateCompanyPayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/companies/${id}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to update company"
      );
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (companyId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/companies/${companyId}`);
      return { id: companyId, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        axiosError.response?.data || "Failed to delete company"
      );
    }
  }
);
