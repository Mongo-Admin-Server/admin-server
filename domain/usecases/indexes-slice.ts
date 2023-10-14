import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";

import { IndexesState } from "../entities/indexes-types";

import * as Api from "@/infrastructure";

export const initialState: IndexesState = {
  loading: false,
  error: "",
};

export const indexesSlice = createSlice({
  name: "indexes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllIndexesByCollection.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllIndexesByCollection.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getAllIndexesByCollection.rejected, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createIndex.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createIndex.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createIndex.rejected, (state) => {
      state.loading = false;
      state.error = "";
    });
  }
});

/************   USECASES FUNCTIONS FOR INDEXES  ************/
export const getAllIndexesByCollection = createAsyncThunk(
  "indexes/getAllIndexesByCollection",
  async ({ database, collection }: { database: string, collection: string }, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      const response = await Api.indexes.getAllIndexesByCollection(database, collection);
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération des indexes : ", error);
      return rejectWithValue("Couldn't get indexes");
    }
  }
);

export const createIndex = createAsyncThunk(
  "indexes/createIndex",
  async ({ databaseName, collectionName, field, unique }: { databaseName: string, collectionName: string, field: string, unique: boolean }, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      const response = await Api.indexes.createIndex(databaseName, collectionName, field, unique);
      return response;
    } catch (error) {
      console.error("Erreur lors de la création de l'index : ", error);
      return rejectWithValue("Couldn't create index");
    }
  }
);

export const selectIndexes = (state: { indexes: IndexesState }) => state.indexes;

export const selectLoadingIndexes = createSelector(
  selectIndexes,
  (indexes) => indexes.loading
);

export const selectErrorIndexes = createSelector(
  selectIndexes,
  (indexes) => indexes.error
);

export default indexesSlice.reducer;