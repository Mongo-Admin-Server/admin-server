import { 
  createSelector, 
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createAction,
} 
from "@reduxjs/toolkit";

import { UserState } from "../entities/user-types";
import eventEmitter from '@/shared/emitter/events';

import * as Api from "@/infrastructure";

export const initialState: UserState = {
  users: [],
  userSelected: "",
  loading: false,
  error: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserSelected: (state, action: PayloadAction<string>) => {
      state.userSelected = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false;
      state.error = ""
    })
  }
})

/************   ACTIONS FOR USER ************/
export const setUserSelected = createAction<string>('user/setUserSelected');
export const setLoadingUser = createAction<boolean>("user/setLoading");
export const setErrorUser = createAction<string>("user/setError");

/************   USECASES FUNCTIONS FOR USER  ************/
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      const response = await Api.user.getUsers();
      return response;
    } catch (error) {
      console.error("Erreur lors du fetch user : ", error);
      return rejectWithValue("Couldn't get user");
    }
  }
);

const selectUser = (state: { user: UserState }) => state.user;

export const selectUserSelected = createSelector(
  selectUser,
  (user) => user.userSelected
);

export const selectUsers = createSelector(
  selectUser,
  (user) => user.users
);

export const selectLoading = createSelector(
  selectUser,
  (user) =>  user.loading
);

export const selectError = createSelector(
  selectUser,
  (user) => user.error
);

export default userSlice.reducer;