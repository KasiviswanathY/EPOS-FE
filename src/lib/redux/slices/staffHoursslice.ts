// lib/redux/slices/staffHoursSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 // adjust path if needed
import { StaffHours } from "@/core/interfaces/StaffHours";
import { createStaffHours, deleteStaffHours, getAllStaffHours, getStaffHoursById, updateStaffHours } from "../actions/staffHours";

interface StaffHoursState {
  list: StaffHours[];
  current?: StaffHours | null;
  loading: boolean;
  error: string | null;

  // create-specific flags
  createLoading: boolean;
  createSuccess: boolean;
  createError: string | null;

  // update/delete flags if needed
  updateLoading: boolean;
  updateSuccess: boolean;
  deleteLoading: boolean;
  deleteSuccess: boolean;
}

const initialState: StaffHoursState = {
  list: [],
  current: null,
  loading: false,
  error: null,

  createLoading: false,
  createSuccess: false,
  createError: null,

  updateLoading: false,
  updateSuccess: false,
  deleteLoading: false,
  deleteSuccess: false,
};

const staffHoursSlice = createSlice({
  name: "staffHours",
  initialState,
  reducers: {
    clearCreateState(state) {
      state.createLoading = false;
      state.createSuccess = false;
      state.createError = null;
    },
    clearError(state) {
      state.error = null;
      state.createError = null;
    },
    setCurrentStaffHours(state, action: PayloadAction<StaffHours | null>) {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get all
    builder.addCase(getAllStaffHours.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllStaffHours.fulfilled, (state, action) => {
      state.loading = false;
      const payload = action.payload as unknown as StaffHours[] | undefined;
      state.list = payload ?? [];
    });
    builder.addCase(getAllStaffHours.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || action.error.message || "Failed to fetch";
    });

    // Get by id
    builder.addCase(getStaffHoursById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getStaffHoursById.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload as unknown as StaffHours;
    });
    builder.addCase(getStaffHoursById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || action.error.message || "Failed to fetch";
    });

    // Create
    builder.addCase(createStaffHours.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
      state.createSuccess = false;
    });
    builder.addCase(createStaffHours.fulfilled, (state, action) => {
      state.createLoading = false;
      state.createSuccess = true;
      // push created item into list if returned
      const created = action.payload as unknown as StaffHours;
      if (created && created.id) {
        state.list = [created, ...state.list];
        state.current = created;
      }
    });
    builder.addCase(createStaffHours.rejected, (state, action) => {
      state.createLoading = false;
      state.createError = action.payload as string || action.error.message || "Failed to create";
      state.createSuccess = false;
    });

    // Update
    builder.addCase(updateStaffHours.pending, (state) => {
      state.updateLoading = true;
      state.updateSuccess = false;
      state.error = null;
    });
    builder.addCase(updateStaffHours.fulfilled, (state, action) => {
      state.updateLoading = false;
      state.updateSuccess = true;
      const updated = action.payload as unknown as StaffHours;
      if (updated && updated.id) {
        state.list = state.list.map((s) => (s.id === updated.id ? updated : s));
        if (state.current?.id === updated.id) state.current = updated;
      }
    });
    builder.addCase(updateStaffHours.rejected, (state, action) => {
      state.updateLoading = false;
      state.updateSuccess = false;
      state.error = action.payload as string || action.error.message || "Failed to update";
    });

    // Delete
    builder.addCase(deleteStaffHours.pending, (state) => {
      state.deleteLoading = true;
      state.deleteSuccess = false;
      state.error = null;
    });
    builder.addCase(deleteStaffHours.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;
      const id = action.payload as string;
      state.list = state.list.filter((s) => s.id !== id);
      if (state.current?.id === id) state.current = null;
    });
    builder.addCase(deleteStaffHours.rejected, (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.error = action.payload as string || action.error.message || "Failed to delete";
    });
  },
});

export const { clearCreateState, clearError, setCurrentStaffHours } = staffHoursSlice.actions;
export default staffHoursSlice.reducer;
