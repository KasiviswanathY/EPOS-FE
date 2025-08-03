import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../actions/loginAction";
import { createUser } from "../actions/createUserAction";
import { createCompany, getCompany, updateCompany } from "../actions/createCompany";

interface User {
  name: string;
  email: string;
}

interface Company {
  id: string;
  name: string;
  taxNumber: string;
  customCurrency: string;
  language: string;
  updateCostPriceOnMasterUpdate: boolean;
  explicitConsent: boolean;
  eraseCustomerData: boolean;
  runReportsOnPageLoad: boolean;
  showIncExTaxOption: boolean;
  maxNoOfDevices: number;
  maxNoOfLocations: number;
  showInstructionsOnStartup: boolean;
}

interface AppState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
  company: Company | null;
}

const initialState: AppState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  success: false,
  company: null,
};

const appSlice = createSlice({
  name: "app",
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
      localStorage.removeItem("authToken");
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
      // ===== LOGIN =====
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
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Login failed";
      })

      // ===== CREATE USER =====
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Create user failed";
      })

      // ===== CREATE COMPANY =====
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCompany.fulfilled, (state, action: PayloadAction<Company>) => {
        state.loading = false;
        state.success = true;
        state.company = action.payload;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Create company failed";
      })

      // ===== GET COMPANY =====
      .addCase(getCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompany.fulfilled, (state, action: PayloadAction<Company>) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Get company failed";
      })

      // ===== UPDATE COMPANY =====
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action: PayloadAction<Company>) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Update company failed";
      });
  },
});

export const { setUserFromLocal, logout, resetSuccess, setError } = appSlice.actions;
export default appSlice.reducer;
