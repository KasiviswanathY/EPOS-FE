import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { Order } from "@/core/interfaces/Order";
import { 
  createOrder, 
  getOrders, 
  getOrderById, 
  updateOrder 
} from "../actions/orderActions";

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const addOrderExtraReducers = (builder: ActionReducerMapBuilder<OrderState>) => {
  builder
    // Create Order
    .addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.currentOrder = action.payload;
      state.orders.unshift(action.payload);
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    })
    // Get Orders
    .addCase(getOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(getOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    // Get Order by ID
    .addCase(getOrderById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
    })
    .addCase(getOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    // Update Order
    .addCase(updateOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
      // Update the order in the orders array
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    })
    .addCase(updateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
};
