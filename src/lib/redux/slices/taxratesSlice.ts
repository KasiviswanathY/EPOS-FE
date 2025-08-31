import { createSlice } from "@reduxjs/toolkit";
import { getAllTaxRates, createTaxRate, updateTaxRate, deleteTaxRate, TaxRate } from "../actions/taxratesAction";

interface TaxRatesState {
  taxRates: TaxRate[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const initialState: TaxRatesState = {
  taxRates: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
};

const taxratesSlice = createSlice({
  name: "taxRates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getAllTaxRates.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTaxRates.fulfilled, (state, action) => {
        state.loading = false;
        state.taxRates = action.payload.data;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllTaxRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // CREATE
      .addCase(createTaxRate.fulfilled, (state, action) => {
        state.taxRates.push(action.payload);
      })
      // UPDATE
      .addCase(updateTaxRate.fulfilled, (state, action) => {
        state.taxRates = state.taxRates.map((tax) =>
          tax.id === action.payload.id ? action.payload : tax
        );
      })
      // DELETE
      .addCase(deleteTaxRate.fulfilled, (state, action) => {
        state.taxRates = state.taxRates.filter(
          (tax) => tax.id !== action.payload.id
        );
      });
  },
});

export default taxratesSlice.reducer;
