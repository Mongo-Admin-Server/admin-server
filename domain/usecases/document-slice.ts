import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";

import * as Api from "@/infrastructure";

import { DocumentState } from "@/domain/entities/document-types";
import eventEmitter from '@/shared/emitter/events';

import { selectCollectionSelected } from "./collection-slice";
import { selectDatabaseSelected } from "./database-slice";

export const initialState: DocumentState = {
  loading: false,
  error: "",
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllDocumentByCollection.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchAllDocumentByCollection.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchAllDocumentByCollection.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchOneDocument.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchOneDocument.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchOneDocument.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(postDocument.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postDocument.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      eventEmitter.dispatch('alert', { type: 'success', message: 'document.createSuccess' });
    });
    builder.addCase(postDocument.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteDocument.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteDocument.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      eventEmitter.dispatch('alert', { type: 'success', message: 'document.deleteSuccess' });
    });
    builder.addCase(deleteDocument.rejected, (state) => {
      state.loading = false;
      eventEmitter.dispatch('alert', { type: 'error', message: 'document.deleteError' });
    });
    builder.addCase(updateDocument.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateDocument.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      eventEmitter.dispatch('alert', { type: 'success', message: 'document.updateSuccess' });
    });
    builder.addCase(updateDocument.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

/************   ACTIONS FOR DOCUMENT  ************/
export const setErrorDocument = createAction<string>("document/setError");
export const setLoadingDocument = createAction<boolean>("document/setLoading");

/************   USECASES FUNCTIONS FOR DOCUMENT  ************/
export const fetchAllDocumentByCollection = createAsyncThunk(
  "document/fetchAllDocumentByCollection",
  async ({ currentPage, perPage, filter }: {currentPage: number, perPage: number, filter: string}, { rejectWithValue, getState }: { rejectWithValue: any, getState: any }) => {
    try {
      const state = getState();
      const databaseName = selectDatabaseSelected({ database: state.database });
      const collectionName = selectCollectionSelected({ collection: state.collection });

      const { documents, total } = await Api.document.getAllDocumentByCollection(databaseName, collectionName, currentPage, perPage, filter);
      return { documents, total };
    } catch (error) {
      console.error("Erreur lors du fetch document : ", error);
      return rejectWithValue("Couldn't get document");
    }
  }
);

export const fetchOneDocument = createAsyncThunk(
  "document/fetchOneDocument",
  async (
    id: string,
    { rejectWithValue, getState }: { rejectWithValue: any, getState: any }
  ) => {
    try {
      const state = getState();
      const databaseName = selectDatabaseSelected({ database: state.database });
      const collectionName = selectCollectionSelected({ collection: state.collection });

      const response = await Api.document.getDocument(databaseName, collectionName, id);
      return response;
    } catch (error) {
      console.error("Erreur lors du fetch document : ", error);
      return rejectWithValue("Couldn't get document");
    }
  }
);

export const postDocument = createAsyncThunk(
  "document/postDocument",
  async (
    query: JSON,
    { rejectWithValue, getState }: { rejectWithValue: any, getState: any }
  ) => {
    try {
      const state = getState();
      const databaseName = selectDatabaseSelected({ database: state.database });
      const collectionName = selectCollectionSelected({ collection: state.collection });

      await Api.document.postDocument(databaseName, collectionName, query);
    } catch (error) {
      console.error("Erreur lors du post document : ", error);
      return rejectWithValue("Couldn't post document");
    }
  }
);

export const deleteDocument = createAsyncThunk(
  "document/deleteDocument",
  async (
    id: string,
    { rejectWithValue, getState }: { rejectWithValue: any, getState: any }
  ) => {
    try {
      const state = getState();
      const databaseName = selectDatabaseSelected({ database: state.database });
      const collectionName = selectCollectionSelected({ collection: state.collection });

      await Api.document.deleteDocument(databaseName, collectionName, id);
    } catch (error) {
      console.error("Erreur lors du delete document : ", error);
      return rejectWithValue("Couldn't delete document");
    }
  }
);

export const updateDocument = createAsyncThunk(
  "document/updateDocument",
  async (
    { id, query }: { id: string; query: JSON },
    { rejectWithValue, getState }: { rejectWithValue: any, getState: any }
  ) => {
    try {
      const state = getState();
      const databaseName = selectDatabaseSelected({ database: state.database });
      const collectionName = selectCollectionSelected({ collection: state.collection });

      await Api.document.updateDocument(databaseName, collectionName, id, query);
    } catch (error) {
      console.error("Erreur lors du update document : ", error);
      return rejectWithValue("Couldn't update document");
    }
  }
);

export const selectDocument = (state: { document: DocumentState }) => state.document;

export const selectLoadingDocument = createSelector(
  selectDocument,
  (document) => document.loading
);

export const selectErrorDocument = createSelector(
  selectDocument,
  (document) => document.error
);

export default documentSlice.reducer;
