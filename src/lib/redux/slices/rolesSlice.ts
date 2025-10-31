import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  deleteRole,
} from "../actions/rolesActions";
import { Role } from "../../../core/interfaces/Role";

interface RoleState {
  roleId: string | null;
  role: Role | null;
  roles: Role[];
  loading: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RoleState = {
  roleId: null,
  role: null,
  roles: [],
  loading: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  error: null,
  success: false,
};

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoleId(state, action: PayloadAction<string | null>) {
      state.roleId = action.payload;
    },
    updateRoleState(state, action: PayloadAction<Role>) {
      state.role = action.payload;
    },
    setRoles(state, action: PayloadAction<Role[]>) {
      state.roles = action.payload;
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
      // Create Role
      .addCase(createRole.pending, (state) => {
        state.loadingCreate = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        createRole.fulfilled,
        (state, action: PayloadAction<Role>) => {
          state.loadingCreate = false;
          state.success = true;
          state.role = action.payload;
          state.roles.push(action.payload);
        }
      )
      .addCase(createRole.rejected, (state, action) => {
        state.loadingCreate = false;
        state.error = (action.payload as string) ?? "Create role failed";
      })

      // Get Single Role
      .addCase(getRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getRole.fulfilled,
        (state, action: PayloadAction<Role>) => {
          state.loading = false;
          state.role = action.payload;
        }
      )
      .addCase(getRole.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Get role failed";
      })

      // Get All Roles
      .addCase(getAllRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllRoles.fulfilled,
        (state, action: PayloadAction<Role[]>) => {
          state.loading = false;
          state.roles = action.payload;
        }
      )
      .addCase(getAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Get roles failed";
      })

      // Update Role
      .addCase(updateRole.pending, (state) => {
        state.loadingUpdate = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        updateRole.fulfilled,
        (state, action: PayloadAction<Role>) => {
          state.loadingUpdate = false;
          state.success = true;
          state.role = action.payload;
          const index = state.roles.findIndex(
            (role) => role.id === action.payload.id
          );
          if (index !== -1) {
            state.roles[index] = action.payload;
          }
        }
      )
      .addCase(updateRole.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.error = (action.payload as string) ?? "Update role failed";
      })

      // Delete Role
      .addCase(deleteRole.pending, (state) => {
        state.loadingDelete = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        deleteRole.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.loadingDelete = false;
          state.success = true;
          state.roles = state.roles.filter(
            (role) => role.id !== action.payload.id
          );
          if (state.role?.id === action.payload.id) {
            state.role = null;
          }
        }
      )
      .addCase(deleteRole.rejected, (state, action) => {
        state.loadingDelete = false;
        state.error = (action.payload as string) ?? "Delete role failed";
      });
  },
});

export const {
  setRoleId,
  updateRoleState,
  setRoles,
  setLoading,
  setError,
  clearError,
  setSuccess,
  resetSuccess,
} = roleSlice.actions;

export default roleSlice.reducer;
