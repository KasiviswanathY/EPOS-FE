import { createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "@/core/interfaces/Order";

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (
    orderData: Omit<Order, "id" | "createdAt" | "updatedAt">,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const data = await response.json();
      return data as Order;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create order";
      return rejectWithValue(message);
    }
  }
);

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch orders");
      }

      const data = await response.json();
      return data?.data as Order[];
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch orders";
      return rejectWithValue(message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch order");
      }

      const data = await response.json();
      return data as Order;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch order";
      return rejectWithValue(message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async (
    { id, data }: { id: string; data: Partial<Order> },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update order");
      }

      const updatedOrder = await response.json();
      return updatedOrder as Order;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update order";
      return rejectWithValue(message);
    }
  }
);
