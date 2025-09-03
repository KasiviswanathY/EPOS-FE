import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Receipt } from "../../../core/interfaces/Receipt";
import {
  createReceipt,
  fetchReceiptByCompanyId,
  updateReceipt,
  deleteReceipt,
} from "../actions/receiptsActions";

interface ReceiptsState {
  receipt: Receipt | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ReceiptsState = {
  receipt: null,
  loading: false,
  error: null,
  success: false,
};

const receiptsSlice = createSlice({
  name: "receipts",
  initialState,
  reducers: {
    setCurrentReceipt(state, action: PayloadAction<Receipt | null>) {
      state.receipt = action.payload;
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
    clearSuccess(state) {
      state.success = false;
    },
    resetState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Fetch receipt by company ID
    builder
      .addCase(fetchReceiptByCompanyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceiptByCompanyId.fulfilled, (state, action) => {
        state.loading = false;
        state.receipt = action.payload;
        state.error = null;
      })
      .addCase(fetchReceiptByCompanyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch receipt";
      });

    // Create receipt
    builder
      .addCase(createReceipt.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createReceipt.fulfilled, (state, action) => {
        state.loading = false;
        state.receipt = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(createReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create receipt";
        state.success = false;
      });

    builder
      .addCase(updateReceipt.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateReceipt.fulfilled, (state, action) => {
        state.loading = false;
        state.receipt = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(updateReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update receipt";
        state.success = false;
      });

    // Delete receipt
    builder
      .addCase(deleteReceipt.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteReceipt.fulfilled, (state) => {
        state.loading = false;
        state.receipt = null;
        state.success = true;
        state.error = null;
      })
      .addCase(deleteReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete receipt";
        state.success = false;
      });
  },
});

export const {
  setCurrentReceipt,
  setLoading,
  setError,
  clearError,
  clearSuccess,
  resetState,
} = receiptsSlice.actions;

export default receiptsSlice.reducer;
