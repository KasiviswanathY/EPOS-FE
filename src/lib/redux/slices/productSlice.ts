import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllproducts,
  createproducts,
  updateproducts,
  deleteproducts,
  Products,
} from "../actions/productsAction";

interface ProductsState {
  products: Products[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  success: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProductsState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // ✅ Create
    builder.addCase(createproducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(createproducts.fulfilled, (state, action: PayloadAction<Products>) => {
        state.loading = false;
        state.success = true;
        state.products.unshift(action.payload);
      })
      .addCase(createproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ✅ Get All
    builder.addCase(getAllproducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllproducts.fulfilled, (state, action: PayloadAction<{ data: Products[] }>) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(getAllproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ✅ Update
    builder.addCase(updateproducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateproducts.fulfilled, (state, action: PayloadAction<Products>) => {
        state.loading = false;
        state.success = true;
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ✅ Delete
    builder.addCase(deleteproducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteproducts.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.loading = false;
        state.success = true;
        state.products = state.products.filter((p) => p.id !== action.payload.id);
      })
      .addCase(deleteproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProductsState } = productsSlice.actions;
export default productsSlice.reducer;
