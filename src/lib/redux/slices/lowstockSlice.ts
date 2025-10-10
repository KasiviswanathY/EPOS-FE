// redux/slices/lowStockSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { getAllLowStocks } from "../actions/lowStockAction";


const initialState = {
  lowStocks: [],
  loading: false,
  error: null as string | null,
};

const lowStockSlice = createSlice({
  name: "lowStocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLowStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLowStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.lowStocks = action.payload.data || [];
      })
      .addCase(getAllLowStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default lowStockSlice.reducer;
