import { createSlice } from "@reduxjs/toolkit";
import {
  createPopup,
  getAllPopups,
  updatePopups,
  deletePopups,
} from "../actions/popupAction";
import { PopUps } from "../../../core/interfaces/PopUps";

interface PopupState {
  popups: PopUps[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PopupState = {
  popups: [] as PopUps[],
  loading: false,
  error: null,
  success: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    resetPopupState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // ✅ Create
    builder
      .addCase(createPopup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPopup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.popups.push(action.payload);
      })
      .addCase(createPopup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ✅ Get All
    builder
      .addCase(getAllPopups.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(getAllPopups.fulfilled, (state, action) => {
    state.popups = action.payload.data; // <-- only keep the array
  })
      .addCase(getAllPopups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ✅ Update
    builder
      .addCase(updatePopups.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePopups.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.popups.findIndex(
          (popup) => popup.id === action.payload.id
        );
        if (index !== -1) {
          state.popups[index] = action.payload;
        }
      })
      .addCase(updatePopups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ✅ Delete
    builder
      .addCase(deletePopups.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePopups.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.popups = state.popups.filter(
          (popup) => popup.id !== action.payload.id
        );
      })
      .addCase(deletePopups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetPopupState } = popupSlice.actions;
export default popupSlice.reducer;
