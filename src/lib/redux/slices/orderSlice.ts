import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/core/interfaces/Order";
import { addOrderExtraReducers } from "./orderSliceExtras";

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: addOrderExtraReducers,
});

export const { clearOrderState, setCurrentOrder, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
