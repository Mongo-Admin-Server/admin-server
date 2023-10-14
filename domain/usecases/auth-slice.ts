import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";

import { AuthState } from "../entities/auth-types";
import eventEmitter from "@/shared/emitter/events";

import * as Api from "@/infrastructure";

export const initialState: AuthState = {
  loading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(testInstance.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(testInstance.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(testInstance.rejected, (state) => {
      state.loading = false;
      state.error = "";
    });
  }
});

/************   USECASES FUNCTIONS FOR AUTH  ************/
export const testInstance = createAsyncThunk(
  "auth/testInstance",
  async (_, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      await Api.auth.testInstance();
      return true;
    } catch (error) {
      console.error("Erreur lors de la connexion a l'instance : ", error);
      return rejectWithValue("Couldn't instance");
    }
  }
);

export const selectAuth = (state: { auth: AuthState }) => state.auth;

export const selectLoadingAuth = createSelector(
  selectAuth,
  (auth) => auth.loading
);

export const selectErrorAuth = createSelector(
  selectAuth,
  (auth) => auth.error
);

export default authSlice.reducer;

