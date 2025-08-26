import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Locations } from "../../../core/interfaces/Locations";
import { getLocations } from "../actions/createLocation";

// Define state for Locations only
interface LocationState {
  list: Locations[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: LocationState = {
  list: [],
  loading: false,
  error: null,
  success: false,
};

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    addLocationLocal: (state, action: PayloadAction<Locations>) => {
      state.list.push(action.payload);
    },
    updateLocationLocal: (state, action: PayloadAction<Locations>) => {
      state.list = state.list.map((loc) =>
        loc.id === action.payload.id ? action.payload : loc
      );
    },
    deleteLocationLocal: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((loc) => loc.id !== action.payload);
    },
    resetLocationSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Locations
      .addCase(getLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLocations.fulfilled, (state, action: PayloadAction<Locations[]>) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load locations";
      });
  },
});

// Export actions
export const {
  addLocationLocal,
  updateLocationLocal,
  deleteLocationLocal,
  resetLocationSuccess,
} = locationSlice.actions;

// Export reducer
export default locationSlice.reducer;
