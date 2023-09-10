import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Dispatch,
} from "@reduxjs/toolkit";

import * as Api from "@/infrastructure";

import { DocumentState } from "@/domain/entities/document-types";

import { store } from "@/store/store";

const initialState: DocumentState = {
  loading: false,
  error: "",
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllDocumentByCollection.pending, (state) => {
      console.log("fetching document");
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchAllDocumentByCollection.fulfilled, (state) => {
      console.log("fetching document success");
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
    });
    builder.addCase(deleteDocument.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateDocument.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateDocument.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateDocument.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

/************   USECASES FUNCTIONS FOR DOCUMENT  ************/
export const fetchAllDocumentByCollection = createAsyncThunk(
  "document/fetchAllDocumentByCollection",
  async (collection: string, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      const reduxStore = store.getState()
      const databaseName = reduxStore.database.databaseSelected;

      const response = await Api.document.getAllDocumentByCollection(databaseName, collection);
      return response;
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
    { rejectWithValue }: { rejectWithValue: any }
  ) => {
    try {
      const reduxStore = store.getState()
      const databaseName = reduxStore.database.databaseSelected;
      const collectionName = reduxStore.collection.collectionSelected;

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
    { collection, query }: { collection: string; query: JSON },
    { rejectWithValue, dispatch }: { rejectWithValue: any, dispatch: Dispatch<any> }
  ) => {
    try {
      const reduxStore = store.getState()
      const databaseName = reduxStore.database.databaseSelected;

      await Api.document.postDocument(databaseName, collection, query);
      dispatch(fetchAllDocumentByCollection(collection));
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
    { rejectWithValue, dispatch }: { rejectWithValue: any, dispatch: Dispatch<any> }
  ) => {
    try {
      const reduxStore = store.getState()
      const databaseName = reduxStore.database.databaseSelected;
      const collectionName = reduxStore.collection.collectionSelected;

      await Api.document.deleteDocument(databaseName, collectionName, id);
      dispatch(fetchAllDocumentByCollection(collectionName));
    } catch (error) {
      console.error("Erreur lors du delete document : ", error);
      return rejectWithValue("Couldn't delete document");
    }
  }
);

export const updateDocument = createAsyncThunk(
  "document/updateDocument",
  async (
    { collection, id, query }: { collection: string; id: string; query: JSON },
    { rejectWithValue, dispatch }: { rejectWithValue: any, dispatch: Dispatch<any> }
  ) => {
    try {
      const reduxStore = store.getState()
      const databaseName = reduxStore.database.databaseSelected;

      await Api.document.updateDocument(databaseName, collection, id, query);
      dispatch(fetchAllDocumentByCollection(collection));
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
