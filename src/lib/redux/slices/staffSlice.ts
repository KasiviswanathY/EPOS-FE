import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Staff } from "@/core/interfaces/Staff";
import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../actions/staffActions";

interface StaffState {
  staff: Staff[];
  currentStaff: Staff | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: StaffState = {
  staff: [],
  currentStaff: null,
  loading: false,
  error: null,
  success: false,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    clearStaffState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setCurrentStaff: (state, action: PayloadAction<Staff | null>) => {
      state.currentStaff = action.payload;
    },
    clearCurrentStaff: (state) => {
      state.currentStaff = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Staff
      .addCase(getAllStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload;
      })
      .addCase(getAllStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Staff by ID
      .addCase(getStaffById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaffById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStaff = action.payload;
      })
      .addCase(getStaffById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Staff
      .addCase(createStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentStaff = action.payload;
        state.staff.unshift(action.payload);
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })
      // Update Staff
      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStaff = action.payload;
        const index = state.staff.findIndex(staff => staff.id === action.payload.id);
        if (index !== -1) {
          state.staff[index] = action.payload;
        }
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Staff
      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = state.staff.filter(staff => staff.id !== action.payload);
        if (state.currentStaff?.id === action.payload) {
          state.currentStaff = null;
        }
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearStaffState, setCurrentStaff, clearCurrentStaff } = staffSlice.actions;
export default staffSlice.reducer;
