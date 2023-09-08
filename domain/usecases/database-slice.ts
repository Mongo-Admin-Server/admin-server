import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Dispatch
} from "@reduxjs/toolkit";

import { DatabaseState } from "../entities/database-types";
import eventEmitter from '@/shared/emitter/events';

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
    builder.addCase(deleteDatabase.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteDatabase.pending, (state) => {
      eventEmitter.dispatch('alert', { type: 'success', message: 'Base de données supprimée !' });
      state.error = "";
    });
    builder.addCase(deleteDatabase.rejected, (state) => {
      state.loading = false;
      eventEmitter.dispatch('alert', { type: 'error', message: 'Un probleme est survenu lors de la suppresion !' });
      state.error = "";
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
export const deleteDatabase = createAsyncThunk(
  "database/deleteDatabaseByName",
  async (params: {databaseName: string; }, { rejectWithValue, dispatch }: { rejectWithValue: any, dispatch: Dispatch<any> }) =>{
    try {
     await Api.database.deleteDatabase(params.databaseName );
     dispatch(fetchAllDatabase());  
    }catch(error) {
      console.error('Erreur lors de la suppression', error);
      return rejectWithValue('Couldn\'t delete database');
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

export const selectLoading = createSelector(
  selectDatabase,
  (database) => database.loading
);

export const selectError = createSelector(
  selectDatabase,
  (database) => database.error
);

export default databaseSlice.reducer;
