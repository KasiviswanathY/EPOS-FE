// redux/slices/productSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  createproducts,
  getproducts,
  getAllproducts,
} from "../actions/productsAction";
import { Product } from "@/core/interfaces/Products";

interface ProductState {
  products: Product[]; // 👈 properly type this
  loading: boolean;
  error: any;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Product
    builder.addCase(createproducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createproducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload as Product); // 👈 tell TS the payload is Product
    });
    builder.addCase(createproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    // Get Products
    builder.addCase(getproducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getproducts.fulfilled, (state, action) => {
      state.loading = false;
      // if backend returns { data: Product[] }
      state.products = action.payload.data as Product[];
    });
    builder.addCase(getproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get All Products
    builder.addCase(getAllproducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllproducts.fulfilled, (state, action) => {
      state.loading = false;

      state.products = Array.isArray(action.payload)
        ? (action.payload as Product[])
        : (action.payload.data as Product[]) || [];
    });
    builder.addCase(getAllproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productSlice.reducer;
