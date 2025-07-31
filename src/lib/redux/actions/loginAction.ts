import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '@/lib/redux/constants/api_routes';

// 🔐 Login Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    payload: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(apiRoutes.login, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Login failed'
      );
    }
  }
);

// 👥 Fetch Users List Thunk
export const fetchUsersList = createAsyncThunk(
  'app/fetchUsersList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const token = state.app.token;

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
      return rejectWithValue(
        err.response?.data?.error || 'Failed to fetch user list'
      );
    }
  }
);
