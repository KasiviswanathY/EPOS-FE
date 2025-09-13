// redux/slices/productSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  createproducts,
  getproducts,
  getAllproducts,
  updateproducts,
  deleteproducts,
} from "../actions/productsAction";
import { Product } from "@/core/interfaces/Products";

interface ProductState {
  products: Product[];
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
    
    // Update Product
    builder.addCase(updateproducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateproducts.fulfilled, (state, action) => {
      state.loading = false;
      const updatedProduct = action.payload as Product;
      const index = state.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    });
    builder.addCase(updateproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Delete Product
    builder.addCase(deleteproducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteproducts.fulfilled, (state, action) => {
      state.loading = false;
      const { id } = action.payload as { id: string };
      state.products = state.products.filter((product) => product.id !== id);
    });
    builder.addCase(deleteproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productSlice.reducer;
