import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RefundReason,createRefundReason,getAllRefundReasons,updateRefundReason,deleteRefundReason } from "../actions/refundreasonsAction";


interface RefundReasonsState {
  refundReasons: RefundReason[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RefundReasonsState = {
  refundReasons: [],
  loading: false,
  error: null,
  success: false,
};

const refundReasonsSlice = createSlice({
  name: "refundReasons",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
    setRefundReasons(state, action: PayloadAction<RefundReason[]>) {
      state.refundReasons = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRefundReasons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllRefundReasons.fulfilled,
        (state, action: PayloadAction<RefundReason[]>) => {
          state.loading = false;
          state.refundReasons = action.payload;
        }
      )
      .addCase(getAllRefundReasons.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Failed to fetch refund reasons";
      })
      .addCase(createRefundReason.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        createRefundReason.fulfilled,
        (state, action: PayloadAction<RefundReason>) => {
          state.loading = false;
          state.success = true;
          state.refundReasons.push(action.payload);
        }
      )
      .addCase(createRefundReason.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Failed to create refund reason";
      })
      .addCase(updateRefundReason.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        updateRefundReason.fulfilled,
        (state, action: PayloadAction<RefundReason>) => {
          state.loading = false;
          state.success = true;
          const index = state.refundReasons.findIndex(
            (r) => r.id === action.payload.id
          );
          if (index !== -1) {
            state.refundReasons[index] = action.payload;
          }
        }
      )
      .addCase(updateRefundReason.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Failed to update refund reason";
      })
      .addCase(deleteRefundReason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteRefundReason.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.loading = false;
          state.refundReasons = state.refundReasons.filter(
            (r) => r.id !== action.payload.id
          );
        }
      )
      .addCase(deleteRefundReason.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Failed to delete refund reason";
      });
  },
});

export const { resetSuccess, setRefundReasons, setLoading, setError, clearError } =
  refundReasonsSlice.actions;

export default refundReasonsSlice.reducer;