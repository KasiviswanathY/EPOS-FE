import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '../constants/api_routes';
import { fetchUsersList } from './getallusersAction';

interface PatchUserPayload {
  id: string;
  updatedData: {
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    role?: string;
    description?: string;
    status?: string;
    permissions?: string[];
  };
}

export const patchUser = createAsyncThunk(
  'app/patchUser',
  async ({ id, updatedData }: PatchUserPayload, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState() as { app: { token: string | null } };
      const token = state.app.token;

      if (!token) {
        return rejectWithValue('Authorization token is missing');
      }

      const response = await axios.patch(
        apiRoutes.updateUser(id),
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // ✅ Refresh list after update
      dispatch(fetchUsersList());

      return response.data;
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'User update failed';
      return rejectWithValue(errorMsg);
    }
  }
);
