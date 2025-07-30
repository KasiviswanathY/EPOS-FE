import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoutes } from '@/lib/redux/constants/api_routes';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdon: string;
  status: string;
  img: string;
}

interface AppState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  usersList: User[];
  usersListLoading: boolean;
  usersListError: string | null;
}

// 🔐 Login Action
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiRoutes.login, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, user } = response.data;

      // Save to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

// 📥 Fetch Users List
export const fetchUsersList = createAsyncThunk(
  'app/fetchUsersList',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { app: AppState };
      const token = state.app.token;

      if (!token) {
        return rejectWithValue('No token available');
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

const initialState: AppState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  usersList: [],
  usersListLoading: false,
  usersListError: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserFromLocal: (state) => {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');

      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
        state.isLoggedIn = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    // loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        const { token, user } = action.payload;
        state.token = token;
        state.user = user;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchUsersList
    builder
      .addCase(fetchUsersList.pending, (state) => {
        state.usersListLoading = true;
        state.usersListError = null;
      })
      .addCase(fetchUsersList.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.usersList = action.payload;
        state.usersListLoading = false;
      })
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.usersListLoading = false;
        state.usersListError = action.error.message || 'Failed to load user list';
      });
  },
});

export const { setUserFromLocal, logout } = appSlice.actions;
export default appSlice.reducer;
