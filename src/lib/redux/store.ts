import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./slices/companySlice";
import clockingTypesReducer from "./slices/clockingTypesSlice";
import locationsReducer from "./slices/locationsSlice";
import popupReducer from "./slices/PopupSlice";
import categoryReducer from "./slices/cateogrySlice";
import brandsReducer from "./slices/brandslice";
import taxratesReducer from "./slices/taxratesSlice";
import productsReducer from "./slices/productSlice";
import receiptsReducer from "./slices/receiptsSlice";
import userReducer from "./slices/userSlice";
import rolesReducer from "./slices/rolesSlice";
import orderReducer from "./slices/orderSlice";
import staffReducer from "./slices/staffSlice";
import stockReducer from "./slices/stockSlice";
export const store = configureStore({
  reducer: {
    company: companyReducer,
    clockingTypes: clockingTypesReducer,
    locations: locationsReducer,
    popup: popupReducer,
    categories: categoryReducer,
    brand: brandsReducer,
    taxrates: taxratesReducer,
    products: productsReducer,
    receipts: receiptsReducer,
    users: userReducer,
    roles: rolesReducer,
    orders: orderReducer,
    staff: staffReducer,
    stock:stockReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
