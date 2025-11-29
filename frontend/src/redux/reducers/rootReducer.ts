import { combineReducers } from "@reduxjs/toolkit";
import storeReducer from "./storeReducer";
import inventoryReducer from "./inventoryReducer";
import productReducer from "./productReducer";
// import other reducers as needed

const rootReducer = combineReducers({
  store: storeReducer, // state.store.{loading,error,list}
  products: productReducer,
  inventory: inventoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
