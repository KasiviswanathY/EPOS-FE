import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '@/lib/redux/constants/api_routes';

interface PatchUserPayload {
  id: number;
  updatedData: {
    username?: string;
    email?: string;
    password?: string;
    status?: string;
    permissions?: string[];
  };
}

export const patchUser = createAsyncThunk(
  'app/patchUser',
  async ({ id, updatedData }: PatchUserPayload, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.app.token;

      if (!token) return rejectWithValue('Missing token');

      const response = await axios.patch(
        `${apiRoutes.updateUser}/${id}`, // PATCH /users/:id
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data; // expected: updated user object
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'User update failed'
      );
    }
  }
);
