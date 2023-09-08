import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Dispatch,
} from "@reduxjs/toolkit";
import { CollectionState } from "../entities/collection-types";
import eventEmitter from '@/shared/emitter/events';

import * as Api from "@/infrastructure";
import { store } from "@/store/store";

const initialState: CollectionState = {
  collections: [],
  collectionSelected: "",
  loading: false,
  error: "",
};

interface ILanguageTrad {
  [key: string]: string
}
const createSuccess: ILanguageTrad = {
  fr: 'Collection créée avec succès.',
  en: 'Collection created successfully.',
  es: 'Colección creada exitosamente.',
}
const createError: ILanguageTrad = {
  fr: 'Erreur lors de la création de la collection.',
  en: 'Error while creating the collection',
  es: 'Error al crear la colección.',
}
export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollectionSelected: (state, action: PayloadAction<string>) => {
      state.collectionSelected = action.payload;
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
    });
    builder.addCase(deleteCollectionByName.pending, (state) => {
      eventEmitter.dispatch('alert', { type: 'success', message: 'Collection supprimée !' });
      state.error = "";
    });
    builder.addCase(deleteCollectionByName.rejected, (state) => {
      state.loading = false;
      eventEmitter.dispatch('alert', { type: 'error', message: 'Un probleme est survenu lors de la suppresion !' });
      state.error = "";
    });
    builder.addCase(postCollectionByName.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postCollectionByName.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      console.log(action.payload)
      eventEmitter.dispatch("alert", {type: "success", message: createSuccess[action.payload]})
    })
    builder.addCase(postCollectionByName.rejected, (state, action) => {
      state.loading = false;
      state.error = "";
      eventEmitter.dispatch("alert", {type: "error", message: createError[action.payload as string]})
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
    { rejectWithValue, dispatch }: { rejectWithValue: any, dispatch: Dispatch<any> }) => {
    try {
      const reduxStore = store.getState()
      const language = reduxStore.setting.language
      const databaseName = reduxStore.database.databaseSelected;
      await Api.collection.postCollectionByName(databaseName, collectionName);
      dispatch(fetchCollectionByDatabase(databaseName))

      return language
    } catch (error) {
      console.error('Erreur lors de la creation', error)
      return rejectWithValue("Couldn't post collection");
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
