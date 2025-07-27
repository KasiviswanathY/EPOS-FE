import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '@/lib/redux/constants/api_routes';
import { log } from 'console';
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    payload: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        apiRoutes.login,
        payload,
        {
    headers: {
        
      'Content-Type': 'application/json'
    }
  }
      );

      const { token, user } = response.data;

      // Save token to localStorage (or sessionStorage, or cookies)
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
     console.log(user)
      return { token, user };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Login Failed'
      );
    }
  }
);
