import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createStock, getAllLocations, getAllProducts, getAllStock, PaginatedStockResponse, Product, Stock } from "../actions/stockAction";
// import { 
//   getAllStock, 
//   createStock, 
//   getAllProducts, 
//   getAllLocations,
//   PaginatedStockResponse,
//   Stock,
//   Product,
//   Location
// } from "../actions/stockActions";

interface StockState {
  stockRecords: Stock[];
  products: Product[];
  locations: Location[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const initialState: StockState = {
  stockRecords: [],
  products: [],
  locations: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStock.pending, (state) => { state.loading = true; })
      .addCase(getAllStock.fulfilled, (state, action: PayloadAction<PaginatedStockResponse>) => {
          state.loading = false;
          state.stockRecords = action.payload.data;
          state.page = action.payload.page;
          state.pageSize = action.payload.pageSize;
          state.total = action.payload.total;
          state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createStock.fulfilled, (state, action: PayloadAction<Stock>) => {
        state.stockRecords.unshift(action.payload);
      })
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      })
      
  },
});

export default stockSlice.reducer;