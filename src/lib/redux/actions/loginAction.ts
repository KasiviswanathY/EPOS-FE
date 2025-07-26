import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    payload: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        ' https://epos-be.onrender.com/api/v1/login',
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

      return { token, user };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Login failed'
      );
    }
  }
);
