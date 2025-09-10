import { createAsyncThunk } from "@reduxjs/toolkit";
import { Staff } from "@/core/interfaces/Staff";

// Get All Staff
export const getAllStaff = createAsyncThunk(
  "staff/getAllStaff",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/staff", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch staff");
      }

      const data = await response.json();
      console.log("data", data);

      return data?.data as Staff[];
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch staff";
      return rejectWithValue(message);
    }
  }
);

// Get Staff by ID
export const getStaffById = createAsyncThunk(
  "staff/getStaffById",
  async (staffId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/staff/${staffId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch staff");
      }

      const data = await response.json();
      return data as Staff;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch staff";
      return rejectWithValue(message);
    }
  }
);

// Create Staff
export const createStaff = createAsyncThunk(
  "staff/createStaff",
  async (
    staffData: Omit<Staff, "id" | "createdAt" | "updatedAt">,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staffData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create staff");
      }

      const data = await response.json();
      return data as Staff;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create staff";
      return rejectWithValue(message);
    }
  }
);

// Update Staff
export const updateStaff = createAsyncThunk(
  "staff/updateStaff",
  async (
    { id, data }: { id: string; data: Partial<Staff> },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/staff/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update staff");
      }

      const updatedStaff = await response.json();
      return updatedStaff as Staff;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update staff";
      return rejectWithValue(message);
    }
  }
);

// Delete Staff
export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (staffId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/staff/${staffId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete staff");
      }

      return staffId;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete staff";
      return rejectWithValue(message);
    }
  }
);
