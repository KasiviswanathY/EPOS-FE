import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createNoSaleReason, deleteNoSaleReason, getAllNoSaleReasons, NoSaleReason, updateNoSaleReason } from "../actions/nosalesreasonsAction";

interface NoSaleReasonsState {
  noSaleReasons: NoSaleReason[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: NoSaleReasonsState = {
  noSaleReasons: [],
  loading: false,
  error: null,
  success: false,
};

const noSaleReasonsSlice = createSlice({
  name: "noSaleReasons",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNoSaleReasons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllNoSaleReasons.fulfilled,
        (state, action: PayloadAction<NoSaleReason[]>) => {
          state.loading = false;
          state.noSaleReasons = action.payload;
        }
      )
      .addCase(getAllNoSaleReasons.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to fetch no-sale reasons";
      })
      .addCase(createNoSaleReason.fulfilled, (state, action: PayloadAction<NoSaleReason>) => {
        state.loading = false;
        state.success = true;
        state.noSaleReasons.push(action.payload);
      })
      .addCase(updateNoSaleReason.fulfilled, (state, action: PayloadAction<NoSaleReason>) => {
        state.loading = false;
        state.success = true;
        const index = state.noSaleReasons.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.noSaleReasons[index] = action.payload;
        }
      })
      .addCase(deleteNoSaleReason.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.loading = false;
        state.noSaleReasons = state.noSaleReasons.filter(r => r.id !== action.payload.id);
      });
  },
});

export const { resetSuccess } = noSaleReasonsSlice.actions;
export default noSaleReasonsSlice.reducer;