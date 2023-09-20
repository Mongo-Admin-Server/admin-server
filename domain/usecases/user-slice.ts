import { 
  createSelector, 
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createAction,
  Dispatch,
} 
from "@reduxjs/toolkit";

import { UserState } from "../entities/user-types";
import eventEmitter from '@/shared/emitter/events';

import * as Api from "@/infrastructure";
import { selectDatabaseSelected } from "./database-slice";
import { fetchCollectionByDatabase } from "./collection-slice";
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
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
      state.error = ""
    });
    builder.addCase(postUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postUser.fulfilled, (state) => {
      state.loading = false;
      eventEmitter.dispatch('alert', { type: 'success', message: 'user.createError' });
    });
    builder.addCase(postUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      eventEmitter.dispatch('alert', { type: 'success', message: 'user.deleteSuccess' });
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.loading = false;
      state.error = "";
      eventEmitter.dispatch('alert', { type: 'error', message: 'user.deleteError' });
    })
  }
})

/************   ACTIONS FOR USER ************/
export const setUserSelected = createAction<string>('user/setUserSelected');
export const setLoadingUser = createAction<boolean>("user/setLoading");
export const setErrorUser = createAction<string>("user/setError");

/************   USECASES FUNCTIONS FOR USER  ************/
export const fetchUsers = createAsyncThunk(
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

export const postUser = createAsyncThunk(
  "user/postUser",
  async(params: { createUser: string, pwd: string, roles: string[]},
    { rejectWithValue, dispatch, getState }: { rejectWithValue: any, dispatch: Dispatch<any>, getState: any }) => {
      try {
        const state = getState();
        const databaseName = selectDatabaseSelected({ database: state.database });

        await Api.user.postUser(databaseName, params.createUser, params.pwd, params.roles);
        dispatch(fetchUsers());
      } catch (error: any) {
        if (error.response.status === 409) {
          return rejectWithValue("User already exists");
        }
        console.error('Erreur lors de la creation', error);
        return rejectWithValue("Couldn't post User");
      }
  }
)
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async(params: { databaseName: string, user: string }, { rejectWithValue, dispatch }: { rejectWithValue: any, dispatch: Dispatch<any> }) => {
    try {
      await Api.user.deleteUser(params.databaseName, params.user);
      dispatch(fetchUsers())
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
      return rejectWithValue("Couldn't delete user");
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