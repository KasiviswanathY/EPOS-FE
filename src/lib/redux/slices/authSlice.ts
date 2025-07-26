import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../actions/loginAction';

interface User {
  name: string;
  email: string;
  // add other fields based on your API's user object
}

interface AppState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        const { token, user } = action.payload;
        state.user = user;
        state.token = token;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = appSlice.actions;
export default appSlice.reducer;
