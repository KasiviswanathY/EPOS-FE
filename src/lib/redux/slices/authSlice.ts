import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createUser } from "../actions/createUserAction";
import { fetchUsersList } from "../actions/getallusersAction";
import { patchUser } from "@/lib/redux/actions/updateAction";
import { deleteUser } from "../actions/deleteUserAction";

import { getRoles } from "../actions/createRoles";
import { Company } from "../../../core/interfaces/Company";
import { getLocations } from "../actions/createLocation";

interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  role?: string;
  createdon?: string;
  status?: string;
  description?: string;
}

interface Receipt {
  id: string;
  companyId: string;
  footerText: string;
  headerText: string;
  printCopies: number;
  showTaxSummary: boolean;
  displayQRCode: boolean;
  termsAndConditions: string;
  guid: BigInteger;
}

interface Role {
  id: string | number;
  name: string;
  description: string;
  permissions: string[];
}

export interface Locations {
  id: string; // Assuming each location has a unique ID
  name: string;
  address: string;
  city: string;
  country: string;
  pincode: string;
  description: string;
  status: "ACTIVE" | "INACTIVE"; // Enum-like restriction
  email: string;
  phone: string;
  language: string;
  timeZone: string;
  companyId: string;
}

interface AppState {
  id: string | null;
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  error: string | null;
  success: boolean;
  usersList: User[];
  usersListLoading: boolean;
  usersListError: string | null;
  company: Company | null;
  receipt: Receipt | null;
  receiptLoading: boolean;
  receiptError: string | null;
  receiptSuccess: boolean;
  clockingTypes: any[]; // You can define a proper ClockingType interface if needed
  clockingLoading: boolean;
  clockingError: string | null;
  clockingSuccess: boolean;
  setClockingTypes: any | null;
  roles: Role[];
  Locations: any[];
}

// --- Helpers to load from localStorage safely ---
const getInitialToken = (): string | null => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    return token && token !== "undefined" ? token : null;
  }
  return null;
};

const getInitialUser = (): User | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    if (user && user !== "undefined") {
      try {
        return JSON.parse(user);
      } catch {
        localStorage.removeItem("user");
        return null;
      }
    }
  }
  return null;
};

// --- Initial state ---
const initialState: AppState = {
  id: null,
  user: getInitialUser(),
  token: getInitialToken(),
  isLoggedIn: !!getInitialToken(),

  // user: null,
  // token: null,
  // isLoggedIn: false,
  loading: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  error: null,
  success: false,
  usersList: [],
  usersListLoading: false,
  usersListError: null,

  company: null,
  receipt: null,
  receiptLoading: false,
  receiptError: null,
  receiptSuccess: false,
  clockingTypes: [],
  clockingLoading: false,
  clockingError: null,
  clockingSuccess: false,
  setClockingTypes: undefined,
  roles: [],
  Locations: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUserFromLocal: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
    resetSuccess: (state) => {
      state.success = false;
    },
    updateLocationSuccess: (state, action) => {
      state.Locations = state.Locations.map((loc) =>
        loc.id === action.payload.id ? action.payload : loc
      );
    },
    deleteLocationSuccess: (state, action) => {
      state.Locations = state.Locations.filter(
        (loc) => loc.id !== action.payload
      );
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== CREATE USER =====
      .addCase(createUser.pending, (state) => {
        state.loadingCreate = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loadingCreate = false;
        state.success = true;
      })
      .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
        state.loadingCreate = false;
        state.error = action.payload;
      })

      // ===== FETCH USERS LIST =====
      .addCase(fetchUsersList.pending, (state) => {
        state.usersListLoading = true;
        state.usersListError = null;
      })
      .addCase(
        fetchUsersList.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.usersList = action.payload;
          state.usersListLoading = false;
        }
      )
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.usersListLoading = false;
        state.usersListError =
          action.error.message || "Failed to load user list";
      })

      // ===== UPDATE USER =====
      .addCase(patchUser.pending, (state) => {
        state.loadingUpdate = true;
        state.error = null;
      })
      .addCase(patchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loadingUpdate = false;
        state.success = true;

        const index = state.usersList.findIndex(
          (u) => u.id === action.payload.id
        );
        if (index !== -1) {
          state.usersList[index] = action.payload;
        }

        if (state.user?.id === action.payload.id) {
          state.user = { ...state.user, ...action.payload };
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(state.user));
          }
        }
      })
      .addCase(patchUser.rejected, (state, action: PayloadAction<any>) => {
        state.loadingUpdate = false;
        state.error = action.payload;
      })

      // ===== DELETE USER =====
      .addCase(deleteUser.pending, (state) => {
        state.loadingDelete = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loadingDelete = false;
        state.success = true;

        state.usersList = state.usersList.filter(
          (u) => u.id.toString() !== action.payload
        );

        if (state.user?.id?.toString() === action.payload) {
          state.user = null;
          state.token = null;
          state.isLoggedIn = false;

          if (typeof window !== "undefined") {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
          }
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loadingDelete = false;
        state.error = (action.payload as string) ?? null;
      })

      ///roles
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(getRoles.rejected, (state) => {
        state.loading = false;
        state.roles = [];
      })
      ////locations
      .addCase(getLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.Locations = action.payload;
      })
      .addCase(getLocations.rejected, (state) => {
        state.loading = false;
        state.Locations = [];
      });
  },
});

export const { updateLocationSuccess, deleteLocationSuccess } =
  appSlice.actions;

export const { setUserFromLocal, logout, resetSuccess, setError } =
  appSlice.actions;
export default appSlice.reducer;
