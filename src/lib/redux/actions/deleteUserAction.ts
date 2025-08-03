import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '@/lib/redux/constants/api_routes';

interface DeleteUserPayload {
  id: string;
}

export const deleteUser = createAsyncThunk(
  'app/deleteUser',
  async ({ id }: DeleteUserPayload, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { app: { token: string | null } };
      const token = state.app.token;

      if (!token) return rejectWithValue('Missing token');

      await axios.delete(apiRoutes.deleteUser(id), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return id; // Return deleted user id
    } catch (err) {
      return rejectWithValue(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'User delete failed'
      );
    }
  }
);