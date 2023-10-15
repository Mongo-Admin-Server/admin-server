import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Dispatch,
  createAction,
} from "@reduxjs/toolkit";

import { CollectionState, CollectionType } from "../entities/collection-types";
import eventEmitter from '@/shared/emitter/events';

import * as Api from "@/infrastructure";

import { selectDatabaseSelected } from "./database-slice";

export const initialState: CollectionState = {
  collections: [],
  collectionSelected: "",
  loading: false,
  error: "",
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<CollectionType[]>) => {
      state.collections = action.payload;
    },
    setCollectionSelected: (state, action: PayloadAction<string>) => {
      state.collectionSelected = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
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
    builder.addCase(deleteCollectionByName.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      eventEmitter.dispatch('alert', { type: 'success', message: 'collection.deleteSuccess' });
    });
    builder.addCase(deleteCollectionByName.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteCollectionByName.rejected, (state) => {
      state.loading = false;
      eventEmitter.dispatch('alert', { type: 'error', message: 'collection.deleteError' });
      state.error = "";
    });
    builder.addCase(postCollectionByName.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postCollectionByName.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      eventEmitter.dispatch('alert', { type: 'success', message: 'collection.createSucces' });
    })
    builder.addCase(postCollectionByName.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(exportCollections.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(exportCollections.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      eventEmitter.dispatch('alert', { type: 'success', message: 'collection.exportSuccess' });
    })
    builder.addCase(exportCollections.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(importCollection.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(importCollection.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      eventEmitter.dispatch('alert', { type: 'success', message: 'collection.importSuccess' });
    });
    builder.addCase(importCollection.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

/************   ACTIONS FOR COLLECTION  ************/
export const setCollections = createAction<CollectionType[]>("collection/setCollections");
export const setCollectionSelected = createAction<string>("collection/setCollectionSelected");
export const setErrorCollection = createAction<string>("collection/setError");
export const setLoadingCollection = createAction<boolean>("collection/setLoading");

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

export const deleteCollectionByName = createAsyncThunk(
  "collection/deleteCollectionByName",
  async (params: {databaseName: string; collectionName: string}, { rejectWithValue, dispatch }: { rejectWithValue: any, dispatch: Dispatch<any> }) =>{
    try {
     await Api.collection.deleteCollectionByName(params.databaseName, params.collectionName);
     dispatch(fetchCollectionByDatabase(params.databaseName));  
    }catch(error) {
      console.error('Erreur lors de la suppression', error);
      return rejectWithValue('Couldn\'t delete collection');
    }
    
  }
); 

export const postCollectionByName = createAsyncThunk(
  "collection/postCollectionByName",
  async (collectionName: string, 
    { rejectWithValue, dispatch, getState }: { rejectWithValue: any, dispatch: Dispatch<any>, getState: any }) => {
    try {
      const state = getState();
      const databaseName = selectDatabaseSelected({ database: state.database });

      await Api.collection.postCollectionByName(databaseName, collectionName);
      dispatch(fetchCollectionByDatabase(databaseName));
    } catch (error: any) {
      if (error.response.status === 409) {
        return rejectWithValue("Collection already exists");
      }
      return rejectWithValue("Couldn't post Collection");
    }
  }
);
export const exportCollections = createAsyncThunk(
  "collection/exportCollections",
  async (params: {databaseName: string; fileName: string; extension: string}, { rejectWithValue, dispatch }: { rejectWithValue: any, dispatch: Dispatch<any> }) =>{
    try {
     await Api.collection.exportCollections(params.databaseName, params.fileName, params.extension);
     dispatch(fetchCollectionByDatabase(params.databaseName));  
    }catch(error) {
      console.error('Erreur lors de la suppression', error);
      return rejectWithValue('Couldn\'t export collections');
    }
  }
);

export const importCollection = createAsyncThunk(
  "collection/importCollection",
  async (params: {databaseName: string; collectionName: string, fileName: string}, { rejectWithValue, dispatch }: { rejectWithValue: any, dispatch: Dispatch<any> }) =>{
    try {
      await Api.collection.importCollection(params.databaseName, params.fileName, params.collectionName);
      dispatch(fetchCollectionByDatabase(params.databaseName));
    }catch(error) {
      console.error('Erreur lors de la suppression', error);
      return rejectWithValue('Couldn\'t import collections');
    }
  }
);

export const getAllFieldsFromCollection = createAsyncThunk(
  "collection/getAllFieldsFromCollection",
  async (params: {databaseName: string; collectionName: string}, { rejectWithValue }: { rejectWithValue: any }) =>{
    try {
      const response = await Api.collection.getAllFieldsFromCollection(params.databaseName, params.collectionName);
      return response;
    }catch(error) {
      console.error('Erreur lors de la suppression', error);
      return rejectWithValue('Couldn\'t get fields from collection');
    }
  }
);

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

export const selectErrorCollection = createSelector(
  selectCollection,
  (collection) => collection.error
)

export default collectionSlice.reducer;
