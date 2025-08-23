import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClockingType } from "../../../core/interfaces/ClockingType";
import {
  createClockingType,
  getAllClockingTypes,
  getClockingType,
  updateClockingType,
  deleteClockingType,
} from "../actions/clockingTypesActions";

interface ClockingTypesState {
  clockingTypes: ClockingType[];
  currentClockingType: ClockingType | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ClockingTypesState = {
  clockingTypes: [],
  currentClockingType: null,
  loading: false,
  error: null,
  success: false,
};

const clockingTypesSlice = createSlice({
  name: "ClockingTypes",
  initialState,
  reducers: {
    setCurrentClockingType(state, action: PayloadAction<ClockingType | null>) {
      state.currentClockingType = action.payload;
    },
    updateClockingTypeState(state, action: PayloadAction<ClockingType>) {
      const index = state.clockingTypes.findIndex(
        (type) => type.id === action.payload.id
      );
      if (index !== -1) {
        state.clockingTypes[index] = action.payload;
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
      // Create Clocking Type
      .addCase(createClockingType.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        createClockingType.fulfilled,
        (state, action: PayloadAction<ClockingType>) => {
          state.loading = false;
          state.success = true;
          state.clockingTypes.push(action.payload);
        }
      )
      .addCase(createClockingType.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Create clocking type failed";
      })

      // Get All Clocking Types
      .addCase(getAllClockingTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllClockingTypes.fulfilled,
        (state, action: PayloadAction<ClockingType[]>) => {
          state.loading = false;
          state.clockingTypes = action.payload;
        }
      )
      .addCase(getAllClockingTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Get clocking types failed";
      })

      // Get Clocking Type by ID
      .addCase(getClockingType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getClockingType.fulfilled,
        (state, action: PayloadAction<ClockingType>) => {
          state.loading = false;
          state.currentClockingType = action.payload;
        }
      )
      .addCase(getClockingType.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Get clocking type failed";
      })

      // Update Clocking Type
      .addCase(updateClockingType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateClockingType.fulfilled,
        (state, action: PayloadAction<ClockingType>) => {
          state.loading = false;
          state.currentClockingType = action.payload;
          const index = state.clockingTypes.findIndex(
            (type) => type.id === action.payload.id
          );
          if (index !== -1) {
            state.clockingTypes[index] = action.payload;
          }
        }
      )
      .addCase(updateClockingType.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Update clocking type failed";
      })

      // Delete Clocking Type
      .addCase(deleteClockingType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClockingType.fulfilled, (state, action) => {
        state.loading = false;
        const clockingTypeId = action.payload.id;
        state.clockingTypes = state.clockingTypes.filter(
          (type) => type.id !== clockingTypeId
        );
      })
      .addCase(deleteClockingType.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Delete clocking type failed";
      });
  },
});

export const {
  setCurrentClockingType,
  updateClockingTypeState,
  setLoading,
  setError,
  clearError,
  setSuccess,
} = clockingTypesSlice.actions;

export default clockingTypesSlice.reducer;
