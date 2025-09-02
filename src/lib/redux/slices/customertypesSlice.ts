
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCustomerType, CustomerType, deleteCustomerType, getAllCustomerTypes, updateCustomerType } from "../actions/customertypesAction";
// import {
//   getAllCustomerTypes,
//   createCustomerType,
//   updateCustomerType,
//   deleteCustomerType,
//   CustomerType,
// } from "../actions/customerTypesActions";

interface CustomerTypesState {
  customerTypes: CustomerType[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerTypesState = {
  customerTypes: [],
  loading: false,
  error: null,
};

const customerTypesSlice = createSlice({
  name: "customerTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL
      .addCase(getAllCustomerTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAllCustomerTypes.fulfilled,
        (state, action: PayloadAction<CustomerType[]>) => {
          state.loading = false;
          state.customerTypes = action.payload;
        }
      )
      .addCase(getAllCustomerTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // CREATE
      .addCase(
        createCustomerType.fulfilled,
        (state, action: PayloadAction<CustomerType>) => {
          state.customerTypes.unshift(action.payload);
        }
      )
      // UPDATE
      .addCase(
        updateCustomerType.fulfilled,
        (state, action: PayloadAction<CustomerType>) => {
          const index = state.customerTypes.findIndex(
            (ct) => ct.id === action.payload.id
          );
          if (index !== -1) {
            state.customerTypes[index] = action.payload;
          }
        }
      )
      // DELETE
      .addCase(
        deleteCustomerType.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.customerTypes = state.customerTypes.filter(
            (ct) => ct.id !== action.payload.id
          );
        }
      );
  },
});

export default customerTypesSlice.reducer;