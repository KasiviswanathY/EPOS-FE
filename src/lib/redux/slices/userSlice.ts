import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../actions/userActions";
import { User } from "../../../core/interfaces/User";

interface UserState {
  userId: string | null;
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  userId: null,
  user: null,
  users: [],
  loading: false,
  error: null,
  success: false,
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
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
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
          // Add new user to users array
          state.users.push(action.payload);
        }
      )
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Create user failed";
      })

      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Get user failed";
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
          // Update user in users array
          const index = state.users.findIndex(u => u.id === action.payload.id);
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Update user failed";
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<{ id: string; data: unknown }>) => {
          state.loading = false;
          state.success = true;
          // Remove user from users array
          state.users = state.users.filter(u => u.id.toString() !== action.payload.id);
          // Clear current user if it was deleted
          if (state.user && state.user.id.toString() === action.payload.id) {
            state.user = null;
          }
        }
      )
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Delete user failed";
      })

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Get users failed";
      });
  },
});

export const {
  setUserId,
  updateUserState,
  setUsers,
  setLoading,
  setError,
  clearError,
  setSuccess,
} = userSlice.actions;

export default userSlice.reducer;
