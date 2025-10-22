import { createAsyncThunk } from "@reduxjs/toolkit";
import { Staff } from "@/core/interfaces/Staff";

// Get All Staff
export const getAllStaffHours = createAsyncThunk(
  "staff/getAllstaffhours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/staffHours", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch staffhours");
      }

      const data = await response.json();
      console.log("data", data);

      return data?.data as Staff[];
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch staffhours";
      return rejectWithValue(message);
    }
  }
);

// Get Staff by ID
export const getStaffHoursById = createAsyncThunk(
  "staff/getstaffhoursById",
  async (staffHoursId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/staffHours/${staffHoursId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch staffhours");
      }

      const data = await response.json();
      return data as Staff;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch staffhours";
      return rejectWithValue(message);
    }
  }
);

// Create Staff
export const createStaffHours = createAsyncThunk(
  "staff/createstaffhours",
  async (
    staffData: Omit<Staff, "id" | "createdAt" | "updatedAt">,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/staffHours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staffData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create staffhours");
      }

      const data = await response.json();
      return data as Staff;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create staffhours";
      return rejectWithValue(message);
    }
  }
);

// Update Staff
export const updateStaffHours = createAsyncThunk(
  "staffhours/updatestaffhours",
  async (
    { id, data }: { id: string; data: Partial<Staff> },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/staffHours/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update staffhours");
      }

      const updatedStaff = await response.json();
      return updatedStaff as Staff;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update staffhours";
      return rejectWithValue(message);
    }
  }
);

// Delete staffhours
export const deleteStaffHours = createAsyncThunk(
  "staffhours/deletestaffhours",
  async (staffHoursId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/staffHours/${staffHoursId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete staffhours");
      }

      return staffHoursId;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete staffhours";
      return rejectWithValue(message);
    }
  }
);
