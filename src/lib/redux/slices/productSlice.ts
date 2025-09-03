// redux/slices/productSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { createproducts, getproducts } from "../actions/productsAction";
import { Products } from "@/core/interfaces/Products";

interface ProductState {
  products: Products[]; // 👈 properly type this
  loading: boolean;
  error: string | null;
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
      state.products.push(action.payload as Products); // 👈 tell TS the payload is Products
    });
    builder.addCase(createproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get Products
    builder.addCase(getproducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getproducts.fulfilled, (state, action) => {
      state.loading = false;
      // if backend returns { data: Products[] }
      state.products = action.payload.data as Products[];
    });
    builder.addCase(getproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productSlice.reducer;
