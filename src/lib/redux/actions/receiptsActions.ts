import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Receipt, CreateReceiptRequest, UpdateReceiptRequest } from '@/core/interfaces/Receipt';

interface UpdateReceiptPayload {
  id: string;
  data: UpdateReceiptRequest;
}

// Get receipt by company ID
export const fetchReceiptByCompanyId = createAsyncThunk<
  Receipt | null,
  { companyId: string },
  { rejectValue: string }
>(
  'receipts/fetchReceiptByCompanyId',
  async ({ companyId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/company-receipts?companyId=${companyId}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch receipt';
      return rejectWithValue(errorMessage);
    }
  }
);

// Create receipt
export const createReceipt = createAsyncThunk<
  Receipt,
  CreateReceiptRequest,
  { rejectValue: string }
>(
  'receipts/createReceipt',
  async (receiptData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/company-receipts', receiptData);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create receipt';
      return rejectWithValue(errorMessage);
    }
  }
);

// Update receipt
export const updateReceipt = createAsyncThunk<
  Receipt,
  UpdateReceiptPayload,
  { rejectValue: string }
>(
  'receipts/updateReceipt',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/company-receipts/${id}`, data);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update receipt';
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete receipt
export const deleteReceipt = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'receipts/deleteReceipt',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/company-receipts/${id}`);
      return id;
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete receipt';
      return rejectWithValue(errorMessage);
    }
  }
);
