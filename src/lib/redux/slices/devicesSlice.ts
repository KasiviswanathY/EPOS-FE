import { Devices } from "@/core/interfaces/Devices";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createDevice, deleteDevice, getAllDevices, getDevice, updateDevice } from "../actions/devicesAction";


interface DevicesState {
  devices: Devices[];
  currentDevice: Devices | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: DevicesState = {
  devices: [],
  currentDevice: null,
  loading: false,
  error: null,
  success: false,
};

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setCurrentDevice(state, action: PayloadAction<Devices | null>) {
      state.currentDevice = action.payload;
    },
    updateDeviceState(state, action: PayloadAction<Devices>) {
      const index = state.devices.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = action.payload;
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
      // CREATE
      .addCase(createDevice.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.devices.push(action.payload);
      })
      .addCase(createDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Create device failed";
      })

      // GET ALL
      .addCase(getAllDevices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload;
      })
      .addCase(getAllDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Fetch devices failed";
      })

      // GET ONE
      .addCase(getDevice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDevice = action.payload;
      })
      .addCase(getDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Fetch device failed";
      })

      // UPDATE
      .addCase(updateDevice.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDevice.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.devices.findIndex((d) => d.id === action.payload.id);
        if (idx !== -1) state.devices[idx] = action.payload;
      })
      .addCase(updateDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Update device failed";
      })

      // DELETE
      .addCase(deleteDevice.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = state.devices.filter(
          (d) => d.id !== action.payload.id
        );
      })
      .addCase(deleteDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Delete device failed";
      });
  },
});

export const {
  setCurrentDevice,
  updateDeviceState,
  setLoading,
  setError,
  clearError,
  setSuccess,
} = devicesSlice.actions;

export default devicesSlice.reducer;
