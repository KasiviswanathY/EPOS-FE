import { createSlice } from "@reduxjs/toolkit";

import { Brands } from "@/core/interfaces/Brands";
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "../actions/brandAction";

interface BrandState {
  brands: Brands[];
  brand: Brands | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: BrandState = {
  brands: [],
  brand: null,
  loading: false,
  error: null,
  success: false,
};

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    resetBrandState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.brand = null;
    },
  },
  extraReducers: (builder) => {
    // CREATE
    builder.addCase(createBrand.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.brands.push(action.payload);
    });
    builder.addCase(createBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // GET ALL
    builder.addCase(getAllBrands.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  builder.addCase(getAllBrands.fulfilled, (state, action) => {
  state.loading = false;
  state.brands = action.payload.data; // ✅ just the array
});
    builder.addCase(getAllBrands.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // GET ONE
    builder.addCase(getBrand.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
    });
    builder.addCase(getBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // UPDATE
    builder.addCase(updateBrand.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.brand = action.payload;
      state.brands = state.brands.map((b) =>
        b.id === action.payload.id ? action.payload : b
      );
    });
    builder.addCase(updateBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // DELETE
    builder.addCase(deleteBrand.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.brands = state.brands.filter((b) => b.id !== action.payload.id);
    });
    builder.addCase(deleteBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetBrandState } = brandSlice.actions;
export default brandSlice.reducer;
