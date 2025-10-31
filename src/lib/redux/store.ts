import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./slices/companySlice";
import clockingTypesReducer from "./slices/clockingTypesSlice";



import RefundReasonsReducer from "./slices/refundreasonSlice";
import noSaleReasonsSliceReducer from "./slices/nosalereasonsSlice";


import discountReasonsSliceReducer from "./slices/discountreasonSlice";

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
import lowstockReducer from"./slices/lowstockSlice";
import stockMovementReducer from "./slices/stockMovementSlice";
import RefundReasonsReducer from "./slices/refundreasonsslice";
import noSaleReasonsSliceReducer from "./slices/nosalesreasonsSlice";
import discountReasonsSliceReducer from "./slices/discountreasonSlice";

import customerTypesReducer from "./slices/customertypesSlice";
import stockMovementReasonsReducer from "./slices/stockmovementreasonsSlice";
import devicesReducer from "./slices/devicesSlice";

import openingHoursReducer from "./slices/openinghoursSlice";


import staffHoursSliceReducer from "./slices/staffHoursslice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    clockingTypes: clockingTypesReducer,



    RefundReasons: RefundReasonsReducer,

    noSaleReasons:noSaleReasonsSliceReducer,

    discountReasonsState: discountReasonsSliceReducer,
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
    lowstock:lowstockReducer,
    stockMovement: stockMovementReducer,
    RefundReasons: RefundReasonsReducer,
    noSaleReasons:noSaleReasonsSliceReducer,
    discountReasonsState: discountReasonsSliceReducer,




    customerTypes:customerTypesReducer, 
    stockMovementReasons: stockMovementReasonsReducer,
    devices: devicesReducer,

    openinghours:openingHoursReducer, 
   
   },

   
    staffHours: staffHoursSliceReducer,

  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
