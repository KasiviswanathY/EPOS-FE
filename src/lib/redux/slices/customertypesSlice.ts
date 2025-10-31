import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCustomerType, deleteCustomerType, getAllCustomerTypes, getCustomerType, updateCustomerType } from "../actions/customertypesAction";
import { CustomerType } from "@/core/interfaces/CustomerType";

interface CustomerTypesState {
  customerTypes: CustomerType[];
  currentCustomerType: CustomerType | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CustomerTypesState = {
  customerTypes: [],
  currentCustomerType: null,
  loading: false,
  error: null,
  success: false,
};

const customerTypesSlice = createSlice({
  name: "customerTypes",
  initialState,
  reducers: {
    setCurrentCustomerType(state, action: PayloadAction<CustomerType | null>) {
      state.currentCustomerType = action.payload;
    },
    updateCustomerTypeState(state, action: PayloadAction<CustomerType>) {
      const index = state.customerTypes.findIndex(
        (type) => type.id === action.payload.id
      );
      if (index !== -1) {
        state.customerTypes[index] = action.payload;
      }
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
    setSuccess(state, action: PayloadAction<boolean>) {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createCustomerType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCustomerType.fulfilled, (state, action) => {
        state.loading = false;
        state.customerTypes.push(action.payload);
      })
      .addCase(createCustomerType.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Create customer type failed";
      })

      // GET ALL
      .addCase(getAllCustomerTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCustomerTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.customerTypes = action.payload;
      })
      .addCase(getAllCustomerTypes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Get customer types failed";
      })

      // GET ONE
      .addCase(getCustomerType.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomerType.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCustomerType = action.payload;
      })
      .addCase(getCustomerType.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Fetch customer type failed";
      })

      // UPDATE
      .addCase(updateCustomerType.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCustomerType.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.customerTypes.findIndex(
          (ct) => ct.id === action.payload.id
        );
        if (idx !== -1) state.customerTypes[idx] = action.payload;
      })
      .addCase(updateCustomerType.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Update customer type failed";
      })

      // DELETE
      .addCase(deleteCustomerType.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCustomerType.fulfilled, (state, action) => {
        state.loading = false;
        state.customerTypes = state.customerTypes.filter(
          (ct) => ct.id !== action.payload.id
        );
      })
      .addCase(deleteCustomerType.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Delete customer type failed";
      });
  },
});

export const {
  setCurrentCustomerType,
  updateCustomerTypeState,
  setLoading,
  setError,
  clearError,
  setSuccess,
} = customerTypesSlice.actions;

export default customerTypesSlice.reducer;
