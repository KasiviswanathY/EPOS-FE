import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cateogry } from "@/core/interfaces/Cateogry"; 
import { createCateogry, getAllCateogry, updateCateogry, deletecateogry } from "../actions/categoryActions";

interface CategoryState {
  categories: Cateogry[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "cateogry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Get All
      .addCase(getAllCateogry.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCateogry.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.categories = action.payload.data; // ✅ backend returns {data: []}
      })
      .addCase(getAllCateogry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Create
      .addCase(createCateogry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCateogry.fulfilled, (state, action: PayloadAction<Cateogry>) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCateogry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Update
      .addCase(updateCateogry.fulfilled, (state, action: PayloadAction<Cateogry>) => {
        state.loading = false;
        const idx = state.categories.findIndex(c => c.id === action.payload.id);
        if (idx !== -1) {
          state.categories[idx] = action.payload;
        }
      })

      // ✅ Delete
      .addCase(deletecateogry.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.loading = false;
        state.categories = state.categories.filter(c => c.id !== action.payload.id);
      });
  },
});

export default categorySlice.reducer;
