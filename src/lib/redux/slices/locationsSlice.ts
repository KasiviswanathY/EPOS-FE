import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../../core/interfaces/Location";
import {
  createLocation,
  getAllLocations,
  getLocation,
  updateLocation,
  deleteLocation,
} from "../actions/locationsActions";

interface LocationsState {
  locations: Location[];
  currentLocation: Location | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: LocationsState = {
  locations: [],
  currentLocation: null,
  loading: false,
  error: null,
  success: false,
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    clearLocationError: (state) => {
      state.error = null;
    },
    clearLocationSuccess: (state) => {
      state.success = false;
    },
    setCurrentLocation: (state, action: PayloadAction<Location>) => {
      state.currentLocation = action.payload;
    },
    clearCurrentLocation: (state) => {
      state.currentLocation = null;
    },
  },
  extraReducers: (builder) => {
    // Create Location
    builder
      .addCase(createLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.locations.push(action.payload);
      })
      .addCase(createLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });

    // Get All Locations
    builder
      .addCase(getAllLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(getAllLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Location
    builder
      .addCase(getLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLocation = action.payload;
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Location
    builder
      .addCase(updateLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.locations.findIndex(
          (location) => location.id === action.payload.id
        );
        if (index !== -1) {
          state.locations[index] = action.payload;
        }
        if (state.currentLocation?.id === action.payload.id) {
          state.currentLocation = action.payload;
        }
      })
      .addCase(updateLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });

    // Delete Location
    builder
      .addCase(deleteLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.locations = state.locations.filter(
          (location) => location.id !== action.payload.id
        );
        if (state.currentLocation?.id === action.payload.id) {
          state.currentLocation = null;
        }
      })
      .addCase(deleteLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const {
  clearLocationError,
  clearLocationSuccess,
  setCurrentLocation,
  clearCurrentLocation,
} = locationsSlice.actions;

export default locationsSlice.reducer;
