import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createDiscountReason, deleteDiscountReason, updateDiscountReason, getAllDiscountReasons } from "../actions/discountreasonsAction";
const fetchDiscountReasonsList = getAllDiscountReasons;

export interface DiscountReason {
  id: number;
  reason: string;
  defaultValue: number;   
}

interface DiscountReasonsState {
  discountReasons: DiscountReason[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: DiscountReasonsState = {
  discountReasons: [],
  loading: false,
  error: null,
  success: false,
};

const discountReasonsSlice = createSlice({
  name: "discountReasons",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscountReasonsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDiscountReasonsList.fulfilled,
        (state, action: PayloadAction<DiscountReason[]>) => {
          state.loading = false;
          state.discountReasons = action.payload;
        }
      )
      .addCase(fetchDiscountReasonsList.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to fetch discount reasons";
      })
      .addCase(createDiscountReason.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        createDiscountReason.fulfilled,
        (state, action: PayloadAction<DiscountReason>) => {
          state.loading = false;
          state.success = true;
          state.discountReasons.push(action.payload);
        }
      )
      .addCase(createDiscountReason.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to create discount reason";
      })
      .addCase(updateDiscountReason.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        updateDiscountReason.fulfilled,
        (state, action: PayloadAction<DiscountReason>) => {
          state.loading = false;
          state.success = true;
          const index = state.discountReasons.findIndex((r) => r.id === action.payload.id);
          if (index !== -1) {
            state.discountReasons[index] = action.payload;
          }
        }
      )
      .addCase(updateDiscountReason.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to update discount reason";
      })
      .addCase(deleteDiscountReason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDiscountReason.fulfilled, (state, action: PayloadAction<{ id: number }>) => {
        state.loading = false;
        state.discountReasons = state.discountReasons.filter(r => r.id !== action.payload.id);
      })
      .addCase(deleteDiscountReason.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to delete discount reason";
      });
  },
});

export const { resetSuccess } = discountReasonsSlice.actions;
export default discountReasonsSlice.reducer;