import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '@/lib/redux/constants/api_routes';

export const fetchUsersList = createAsyncThunk(
  'app/fetchUsersList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.app.token;

      console.log('Token:', token);

      if (!token) {
        return rejectWithValue('Token is missing from Redux state');
      }

      const response = await axios.get(apiRoutes.fetchUsers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch user list');
    }
  }
);
