import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createStockMovementReason,
  deleteStockMovementReason,
  getAllStockMovementReasons,
  StockMovementReason,
  updateStockMovementReason,
} from "../actions/stockmovementreasonAction";

interface StockMovementReasonsState {
  stockMovementReasons: StockMovementReason[];
  loading: boolean;
  error: string | null;
}

const initialState: StockMovementReasonsState = {
  stockMovementReasons: [],
  loading: false,
  error: null,
};

const stockMovementReasonsSlice = createSlice({
  name: "stockMovementReasons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(getAllStockMovementReasons.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllStockMovementReasons.fulfilled,
        (state, action: PayloadAction<StockMovementReason[]>) => {
          state.loading = false;
          state.stockMovementReasons = action.payload;
        }
      )
      .addCase(getAllStockMovementReasons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // CREATE
      .addCase(
        createStockMovementReason.fulfilled,
        (state, action: PayloadAction<StockMovementReason>) => {
          state.stockMovementReasons.unshift(action.payload);
        }
      )
      // UPDATE
      .addCase(
        updateStockMovementReason.fulfilled,
        (state, action: PayloadAction<StockMovementReason>) => {
          const index = state.stockMovementReasons.findIndex(
            (r) => r.id === action.payload.id
          );
          if (index !== -1) {
            state.stockMovementReasons[index] = action.payload;
          }
        }
      )
      // DELETE
      .addCase(
        deleteStockMovementReason.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.stockMovementReasons = state.stockMovementReasons.filter(
            (r) => r.id !== action.payload.id
          );
        }
      );
  },
});

export default stockMovementReasonsSlice.reducer;
