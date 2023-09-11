import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { AuthState } from "../entities/auth-types";

import * as Api from "@/infrastructure";

const initialState: AuthState = {
  isLogged: false,
  loading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
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
    builder.addCase(postUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postUser.fulfilled, (state) => {
      state.isLogged = false;
      state.error = ""
    });
    builder.addCase(postUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })
  }
});

/************   USECASES FUNCTIONS FOR AUTH  ************/
export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      const response = await Api.auth.login(data.email, data.password);
      return response.data;
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

export const postUser = createAsyncThunk(
  "auth/postUser",
  async(connection_url: string, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      await Api.auth.postUser(connection_url);
    } catch (error) {
      console.error("Erreur lors du login : ", error);
      return rejectWithValue("Couldn't login");
    }
  }
)

export const selectAuth = (state: { auth: AuthState }) => state.auth;

export const selectIsLogged = createSelector(
  selectAuth,
  (auth) => auth.isLogged
);

export default authSlice.reducer;

