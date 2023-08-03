import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { DatabaseState } from "../entities/database-types";

import * as Api from "@/infrastructure";

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
    }
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
  }
});

/************   USECASES FUNCTIONS FOR DATABASE  ************/

export const fetchAllDatabase = createAsyncThunk(
  "todos/myTodos",
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

export const { setDatabaseSelected } = databaseSlice.actions;

const selectDatabase = (state: { database: DatabaseState }) => state.database;

export const selectDatabaseSelected = createSelector(
  selectDatabase,
  (database) => database.databaseSelected
);

export const selectDatabases = createSelector(
  selectDatabase,
  (database) => database.databases
);

export default databaseSlice.reducer;
