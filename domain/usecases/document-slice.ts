import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import * as Api from "@/infrastructure";

const initialState = {
  documents: [],
  loading: false,
  error: "",
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllDocumentByCollection.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchAllDocumentByCollection.fulfilled, (state, action) => {
      state.loading = false;
      state.documents = action.payload;
    });
    builder.addCase(fetchAllDocumentByCollection.rejected, (state) => {
      state.loading = false;
      state.error = "";
    });
  }
});

/************   USECASES FUNCTIONS FOR DOCUMENT  ************/
export const fetchAllDocumentByCollection = createAsyncThunk(
  "document/fetchAllDocumentByCollection",
  async (collection: string, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      const response = await Api.document.getAllDocumentByCollection(collection);
      return response.data;
    } catch (error) {
      console.error("Erreur lors du fetch document : ", error);
      return rejectWithValue("Couldn't get document");
    }
  }
);

export const selectDocument = (state: any) => state.document;

export const selectDocuments = createSelector(
  selectDocument,
  (document) => document.documents
);

export const selectLoading = createSelector(
  selectDocument,
  (document) => document.loading
);

export const selectError = createSelector(
  selectDocument,
  (document) => document.error
);

export default documentSlice.reducer;
