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
  isLogged: false,
  loading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false;
      state.isLogged = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.error = "";
      eventEmitter.dispatch('alert', { type: 'error', message: 'login.error' });
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.isLogged = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.error = "";
    });
  }
});

/************   ACTIONS FOR COLLECTION  ************/
export const setErrorAuth = createAction<string>("auth/setError");
export const setLoadingAuth = createAction<boolean>("auth/setLoading");
export const setIsLogged = createAction<boolean>("auth/setIsLogged");

/************   USECASES FUNCTIONS FOR AUTH  ************/
export const login = createAsyncThunk(
  "auth/login",
  async (uri: string, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      await Api.auth.login(uri);
    } catch (error) {
      console.error("Erreur lors du login : ", error);
      return rejectWithValue("Couldn't login");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      await Api.auth.logout();
    } catch (error) {
      console.error("Erreur lors du logout : ", error);
      return rejectWithValue("Couldn't logout");
    }
  }
);

export const selectAuth = (state: { auth: AuthState }) => state.auth;

export const selectIsLogged = createSelector(
  selectAuth,
  (auth) => auth.isLogged
);

export const selectLoadingAuth = createSelector(
  selectAuth,
  (auth) => auth.loading
);

export const selectErrorAuth = createSelector(
  selectAuth,
  (auth) => auth.error
);

export default authSlice.reducer;

