import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getRoles } from "../actions/createRoles";
import { Company } from "../../../core/interfaces/Company";
import { User } from "@/core/interfaces/User";

interface Role {
  id: string | number;
  name: string;
  description: string;
  permissions: string[];
}

interface AppState {
  id: string | null;
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  error: string | null;
  success: boolean;

  usersListLoading: boolean;
  usersListError: string | null;
  company: Company | null;
  receiptLoading: boolean;
  receiptError: string | null;
  receiptSuccess: boolean;

  clockingLoading: boolean;
  clockingError: string | null;
  clockingSuccess: boolean;
  roles: Role[];
}

// --- Helpers to load from localStorage safely ---
const getInitialUser = (): User | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user && user !== "undefined") {
      try {
        return JSON.parse(user);
      } catch {
        localStorage.removeItem("user");
        return null;
      }
    }
  }
  return null;
};

// --- Initial state ---
const initialState: AppState = {
  id: null,
  user: getInitialUser(),
  isLoggedIn: !!getInitialUser(),

  // user: null,
  // isLoggedIn: false,
  loading: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  error: null,
  success: false,

  usersListLoading: false,
  usersListError: null,

  company: null,

  receiptLoading: false,
  receiptError: null,
  receiptSuccess: false,
  clockingLoading: false,
  clockingError: null,
  clockingSuccess: false,

  roles: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserFromLocal: (
      state,
      action: PayloadAction<{ user: User }>
    ) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      
      // Clear localStorage only (cookies are httpOnly and handled server-side)
      localStorage.removeItem("user");
    },
    resetSuccess: (state) => {
      state.success = false;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      ///roles
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(getRoles.rejected, (state) => {
        state.loading = false;
        state.roles = [];
      });
  },
});

export const { setUserFromLocal, logout, resetSuccess, setError } =
  appSlice.actions;
export default appSlice.reducer;
