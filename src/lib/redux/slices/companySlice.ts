import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createCompany,
  getCompany,
  updateCompany,
} from "../actions/companiesActions";
import { Company } from "../../../core/interfaces/Company";

interface CompanyState {
  companyId: string | null;
  company: Company | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CompanyState = {
  companyId: null,
  company: null,
  loading: false,
  error: null,
  success: false,
};

const companySlice = createSlice({
  name: "CompanyDetails",
  initialState,
  reducers: {
    setCompanyId(state, action: PayloadAction<string | null>) {
      state.companyId = action.payload;
    },
    updateCompanyState(state, action: PayloadAction<Company>) {
      state.company = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setSuccess(state, action: PayloadAction<boolean>) {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        createCompany.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.loading = false;
          state.success = true;
          state.company = action.payload;
        }
      )
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Create company failed";
      })

      // ===== GET COMPANY =====
      .addCase(getCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCompany.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.loading = false;
          state.company = action.payload;
        }
      )
      .addCase(getCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Get company failed";
      })
      // ===== UPDATE COMPANY =====
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCompany.fulfilled,
        (state, action: PayloadAction<Company>) => {
          state.loading = false;
          state.company = action.payload;
        }
      )
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Update company failed";
      });
  },
});

export const {
  setCompanyId,
  updateCompanyState,
  setLoading,
  setError,
  clearError,
  setSuccess,
} = companySlice.actions;

export default companySlice.reducer;
