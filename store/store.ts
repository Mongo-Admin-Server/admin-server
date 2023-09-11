import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";

import {
  EqualityFn,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux';

import databaseSlice from "@/domain/usecases/database-slice";
import collectionSlice from "@/domain/usecases/collection-slice";
import settingSlice from "@/domain/usecases/setting-slice";
import authSlice from "@/domain/usecases/auth-slice";

export const reducer = combineReducers({
  database: databaseSlice,
  collection: collectionSlice,
  setting: settingSlice,
  auth: authSlice,
});

export const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useDispatch = () => useDispatchBase<AppDispatch>()

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: EqualityFn<TSelected> | undefined
): TSelected => useSelectorBase<RootState, TSelected>(selector, equalityFn);

