import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { CollectionState } from "../entities/collection-types";

import * as Api from "@/infrastructure";

const initialState: CollectionState = {
  collections: [],
  collectionSelected: "",
  loading: false,
  error: "",
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollectionSelected: (state, action: PayloadAction<string>) => {
      state.collectionSelected = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchCollectionByDatabase.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchCollectionByDatabase.fulfilled, (state, action) => {
      state.loading = false;
      state.collections = action.payload;
    });
    builder.addCase(fetchCollectionByDatabase.rejected, (state) => {
      state.loading = false;
      state.error = "";
    });
  },
});

/************   USECASES FUNCTIONS FOR COLLECTION  ************/
export const fetchCollectionByDatabase = createAsyncThunk(
  "collection/fetchCollectionByDatabase",
  async (database: string, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      const response = await Api.collection.getCollectionsByDatabase(database);
      return response;
    } catch (error) {
      console.error("Erreur lors du fetch collection : ", error);
      return rejectWithValue("Couldn't get collection");
    }
  }
);

export const { setCollectionSelected } = collectionSlice.actions;

const selectCollection = (state: { collection: CollectionState }) => state.collection;

export const selectCollectionSelected = createSelector(
  selectCollection,
  (collection) => collection.collectionSelected
);

export const selectCollectionByDatabase = createSelector(
  selectCollection,
  (collection) => collection.collections
);

export const selectLoadingCollection = createSelector(
  selectCollection,
  (collection) => collection.loading
);

export default collectionSlice.reducer;
