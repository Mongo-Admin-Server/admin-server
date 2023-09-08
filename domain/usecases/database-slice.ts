import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { DatabaseState, CreateDatabaseState } from "../entities/database-types";

import * as Api from "@/infrastructure";

import { fetchCollectionByDatabase } from "./collection-slice";

const initialState: DatabaseState = {
  databases: [],
  databaseSelected: "",
  loading: false,
  error: "",
};

const initialCreateState: CreateDatabaseState = {
  dataCreateDB: [],
  isCreate: false,
  loading: false,
  error: null,
}

export const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    setDatabaseSelected: (state, action: PayloadAction<string>) => {
      state.databaseSelected = action.payload;
      fetchCollectionByDatabase(action.payload);
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

export const databaseCreateSlice = createSlice({
  name: "dataCreateDB",
  initialState: initialCreateState,
  reducers: {
    setIsCreate: (state, action: PayloadAction<boolean>) => {
      state.isCreate = action.payload;
    },
    resetIsCreate: (state) => {
      state.isCreate = false;
    }
  },

  extraReducers(builder) {
    builder.addCase(createDatabase.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createDatabase.fulfilled, (state, action) => {
      state.loading = false;
      state.isCreate = action.payload;
    });
    builder.addCase(createDatabase.rejected, (state, action: any) => {
      state.loading = false;
      state.isCreate = false;
      state.error = action.payload.errorMessage || "Une erreur s'est produite";
    });
  },
})
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

export const createDatabase = createAsyncThunk(
  "database",
  async (
    data: { databaseName: string; collectionName: string }
  ) => {
    const response = await Api.database.createDB(
      data.databaseName,
      data.collectionName
    );
    return response;
  }
);

export const { setDatabaseSelected } = databaseSlice.actions;
export const { setIsCreate } = databaseCreateSlice.actions;
export const { resetIsCreate } = databaseCreateSlice.actions;

export const databaseReducer = databaseSlice.reducer;
export const databaseCreateReducer = databaseCreateSlice.reducer;

const selectDatabase = (state: { database: DatabaseState }) => state.database;

const selectCreateDatabase = (state: { dataCreateDB: CreateDatabaseState }) => state.dataCreateDB;

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

export const selectIsCreate = createSelector(
  selectCreateDatabase,
  (dataCreateDB) => dataCreateDB.isCreate
);