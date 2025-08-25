import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser } from "../actions/createUserAction";
import { fetchUsersList } from "../actions/getallusersAction";
import { patchUser } from "../actions/updateAction";
import { deleteUser } from "../actions/deleteUserAction";

interface UserState {
  userId: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
   usersList: User[];
   
}


const initialState: UserState = {
  userId: null,
  user: null,
  loading: false,
  error: null,
  success: false,
  usersList: [],
  
};

const userSlice = createSlice({
  name: "UserDetails",
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string | null>) {
      state.userId = action.payload;
    },
    updateUserState(state, action: PayloadAction<User>) {
      state.user = action.payload;
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
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.success = true;
          state.user = action.payload;
        }
      )
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Create company failed";
      })

      
      .addCase(fetchUsersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsersList.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Get company failed";
      })
      
      .addCase(patchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        patchUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(patchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Update company failed";
      })

       .addCase(deleteUser.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.loading = false;
        state.usersList = state.usersList.filter((u) => u.id !== action.payload.id);
      });
  },
});

export const {
  setUserId,
  updateUserState,
  setLoading,
  setError,
  clearError,
  setSuccess,
  resetSuccess,
} = userSlice.actions;

export default userSlice.reducer;
