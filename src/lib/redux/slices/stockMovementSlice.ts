import { createSlice } from "@reduxjs/toolkit";
import { StockMovement } from "@/core/interfaces/StockMovement";
import {
  createStockMovement,
  createBulkStockMovements,
  getStockMovements,
  getStockMovementsByStockId,
} from "../actions/stockMovementActions";

interface StockMovementState {
  stockMovements: StockMovement[];
  loading: boolean;
  error: string | null;
  success: boolean;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  stats: any;
}

const initialState: StockMovementState = {
  stockMovements: [],
  loading: false,
  error: null,
  success: false,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  stats: null,
};

const stockMovementSlice = createSlice({
  name: "stockMovement",
  initialState,
  reducers: {
    clearStockMovementState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Create single stock movement
    builder
      .addCase(createStockMovement.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createStockMovement.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.stockMovements.unshift(action.payload);
      })
      .addCase(createStockMovement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });

    // Create bulk stock movements
    builder
      .addCase(createBulkStockMovements.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBulkStockMovements.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Add the new movements to the beginning of the array
        state.stockMovements = [...action.payload, ...state.stockMovements];
      })
      .addCase(createBulkStockMovements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });

    // Get all stock movements
    builder
      .addCase(getStockMovements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStockMovements.fulfilled, (state, action) => {
        state.loading = false;
        state.stockMovements = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(getStockMovements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get stock movements by stock ID
    builder
      .addCase(getStockMovementsByStockId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStockMovementsByStockId.fulfilled, (state, action) => {
        state.loading = false;
        state.stockMovements = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(getStockMovementsByStockId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearStockMovementState } = stockMovementSlice.actions;
export default stockMovementSlice.reducer;
