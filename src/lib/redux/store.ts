import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/authSlice";
import companyReducer from "./slices/companySlice";
import clockingTypesReducer from "./slices/clockingTypesSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    company: companyReducer,
    clockingTypes: clockingTypesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
