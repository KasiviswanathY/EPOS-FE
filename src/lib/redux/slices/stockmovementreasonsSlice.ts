import { StockMovementReason } from "@/core/interfaces/StockMovementReason";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createStockMovementReason, deleteStockMovementReason, getAllStockMovementReasons, getStockMovementReason, updateStockMovementReason } from "../actions/stockmovementreasonsAction";

interface StockMovementReasonsState {
  stockMovementReasons: StockMovementReason[];
  currentStockMovementReason: StockMovementReason | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: StockMovementReasonsState = {
  stockMovementReasons: [],
  currentStockMovementReason: null,
  loading: false,
  error: null,
  success: false,
};

const stockMovementReasonsSlice = createSlice({
  name: "stockMovementReasons",
  initialState,
  reducers: {
    setCurrentStockMovementReason(
      state,
      action: PayloadAction<StockMovementReason | null>
    ) {
      state.currentStockMovementReason = action.payload;
    },
    updateStockMovementReasonState(
      state,
      action: PayloadAction<StockMovementReason>
    ) {
      const index = state.stockMovementReasons.findIndex(
        (reason) => reason.id === action.payload.id
      );
      if (index !== -1) {
        state.stockMovementReasons[index] = action.payload;
      }
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
      // CREATE
      .addCase(createStockMovementReason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStockMovementReason.fulfilled, (state, action) => {
        state.loading = false;
        state.stockMovementReasons.push(action.payload);
      })
      .addCase(createStockMovementReason.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Create stock movement reason failed";
      })

      // GET ALL
      .addCase(getAllStockMovementReasons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStockMovementReasons.fulfilled, (state, action) => {
        state.loading = false;
        state.stockMovementReasons = action.payload;
      })
      .addCase(getAllStockMovementReasons.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Fetch stock movement reasons failed";
      })

      // GET ONE
      .addCase(getStockMovementReason.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStockMovementReason.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStockMovementReason = action.payload;
      })
      .addCase(getStockMovementReason.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Fetch stock movement reason failed";
      })

      // UPDATE
      .addCase(updateStockMovementReason.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStockMovementReason.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.stockMovementReasons.findIndex(
          (r) => r.id === action.payload.id
        );
        if (idx !== -1) state.stockMovementReasons[idx] = action.payload;
      })
      .addCase(updateStockMovementReason.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Update stock movement reason failed";
      })

      // DELETE
      .addCase(deleteStockMovementReason.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStockMovementReason.fulfilled, (state, action) => {
        state.loading = false;
        state.stockMovementReasons = state.stockMovementReasons.filter(
          (r) => r.id !== action.payload.id
        );
      })
      .addCase(deleteStockMovementReason.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Delete stock movement reason failed";
      });
  },
});

export const {
  setCurrentStockMovementReason,
  updateStockMovementReasonState,
  setLoading,
  setError,
  clearError,
  setSuccess,
} = stockMovementReasonsSlice.actions;

export default stockMovementReasonsSlice.reducer;
