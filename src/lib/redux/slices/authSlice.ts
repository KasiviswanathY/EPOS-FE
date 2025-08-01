import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../actions/loginAction';
import { createUser } from '../actions/createUserAction'; 

interface User {
  name: string;
  email: string;
  
}

interface AppState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  success: boolean; // for user creation or other success actions
}

const initialState: AppState = {
  user: null,
 token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  success: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserFromLocal: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    
  },
  extraReducers: (builder) => {
    builder
      // ===== LOGIN CASES =====
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        const { token, user } = action.payload;
        state.token = action.payload.token;
        state.user = user;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== CREATE USER CASES =====
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserFromLocal, logout, resetSuccess } = appSlice.actions;
export default appSlice.reducer;
