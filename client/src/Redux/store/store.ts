// store/index.ts
import { configureStore, combineReducers ,getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import songSlice from "../features/songSlice";
const rootReducer = combineReducers({
  user: authReducer,
  song:songSlice
});
const persistConfig = {
  key: "user",
  storage,
  version:1
};


const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
