import { createSlice } from "@reduxjs/toolkit";
import { Stock } from "../actions/stockActions";
import {
  getAllStock,
  createStock,
  updateStock,
  deleteStock,
} from "../actions/stockActions";

// --- STATE TYPE ---
interface StockState {
  stockRecords: Stock[];   // ✅ use stockRecords consistently
  loading: boolean;
  error: string | null;
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// --- INITIAL STATE ---
const initialState: StockState = {
  stockRecords: [],
  loading: false,
  error: null,
  success: false,
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
};

// --- SLICE ---
const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    clearStockError: (state) => {
      state.error = null;
    },
    clearStockSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(getAllStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStock.fulfilled, (state, action) => {
        state.loading = false;
        state.stockRecords = action.payload.data; // ✅ fixed
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CREATE
      .addCase(createStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStock.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.stockRecords.push(action.payload); // ✅ fixed
      })
      .addCase(createStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE
      .addCase(updateStock.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.stockRecords.findIndex(
          (stock) => stock.id === action.payload.id
        );
        if (index !== -1) {
          state.stockRecords[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteStock.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.stockRecords = state.stockRecords.filter(
          (stock) => stock.id !== action.payload.id
        );
      });
  },
});

export const { clearStockError, clearStockSuccess } = stockSlice.actions;
export default stockSlice.reducer;
