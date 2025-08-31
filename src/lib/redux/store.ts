import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/authSlice";
import companyReducer from "./slices/companySlice";
import clockingTypesReducer from "./slices/clockingTypesSlice";
import popupReducer from "./slices/PopupSlice";
import categoryReducer from "./slices/cateogrySlice";
import brandsReducer from "./slices/brandslice";
import taxratesReducer from "./slices/taxratesSlice";
export const store = configureStore({
  reducer: {
    app: appReducer,
    company: companyReducer,
    clockingTypes: clockingTypesReducer,
    popup: popupReducer,
    categories: categoryReducer,
    brand:brandsReducer,
    taxrates: taxratesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
