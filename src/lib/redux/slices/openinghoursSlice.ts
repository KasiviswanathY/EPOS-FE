import { createSlice } from "@reduxjs/toolkit";

import { OpeningHour } from "@/core/interfaces/OpeningHours";
import { createOpeningHour, deleteOpeningHour, getAllOpeningHours, updateOpeningHour } from "../actions/openinghoursAction";

interface OpeningHoursState {
  openingHours: OpeningHour[];
  loading: boolean;
  error: string | null;
}

const initialState: OpeningHoursState = {
  openingHours: [],
  loading: false,
  error: null,
};

const openingHoursSlice = createSlice({
  name: "openingHours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOpeningHours.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOpeningHours.fulfilled, (state, action) => {
        state.loading = false;
        state.openingHours = action.payload;
      })
      .addCase(getAllOpeningHours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createOpeningHour.fulfilled, (state, action) => {
        state.openingHours.push(action.payload);
      })
      .addCase(updateOpeningHour.fulfilled, (state, action) => {
        const idx = state.openingHours.findIndex(
          (item) => item.id === action.payload.id
        );
        if (idx !== -1) state.openingHours[idx] = action.payload;
      })
      .addCase(deleteOpeningHour.fulfilled, (state, action) => {
        state.openingHours = state.openingHours.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default openingHoursSlice.reducer;
