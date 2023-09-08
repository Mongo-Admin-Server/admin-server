import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Dispatch,
} from "@reduxjs/toolkit";

import { DatabaseState } from "../entities/database-types";

import * as Api from "@/infrastructure";

import { fetchCollectionByDatabase } from "./collection-slice";

const initialState: DatabaseState = {
  databases: [],
  databaseSelected: "",
  loading: false,
  error: "",
};

export const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    setDatabaseSelected: (state, action: PayloadAction<string>) => {
      state.databaseSelected = action.payload;
      fetchCollectionByDatabase(action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllDatabase.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchAllDatabase.fulfilled, (state, action) => {
      state.loading = false;
      state.databases = action.payload;
    });
    builder.addCase(fetchAllDatabase.rejected, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(postDatabase.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postDatabase.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(postDatabase.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

/************   USECASES FUNCTIONS FOR DATABASE  ************/

export const fetchAllDatabase = createAsyncThunk(
  "database/fetchAllDatabase",
  async (_, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      const response = await Api.database.getAllDatabase();
      return response;
    } catch (error) {
      console.error("Erreur lors du fetch database : ", error);
      return rejectWithValue("Couldn't get database");
    }
  }
);

export const postDatabase = createAsyncThunk(
  "database/postDatabase",
  async (
    { databaseName, collectionName }: { databaseName: string; collectionName: string },
    { rejectWithValue, dispatch }: { rejectWithValue: any, dispatch: Dispatch<any> }
  ) => {
    try {
      await Api.database.postDatabase(databaseName, collectionName);
      dispatch(fetchAllDatabase());
    } catch (error: any) {
      if (error.response.status === 409) {
        return rejectWithValue("Database already exists");
      }
      return rejectWithValue("Couldn't post database");
    }
  }
);

export const { setDatabaseSelected, setError } = databaseSlice.actions;

const selectDatabase = (state: { database: DatabaseState }) => state.database;

export const selectDatabaseSelected = createSelector(
  selectDatabase,
  (database) => database.databaseSelected
);

export const selectDatabases = createSelector(
  selectDatabase,
  (database) => database.databases
);

export const selectLoading = createSelector(
  selectDatabase,
  (database) => database.loading
);

export const selectError = createSelector(
  selectDatabase,
  (database) => database.error
);

export default databaseSlice.reducer;