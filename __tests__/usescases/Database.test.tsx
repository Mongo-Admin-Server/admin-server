/* eslint-disable no-undef */

// import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import configureMockStore from "redux-mock-store";

import { databaseSlice, initialState, setDatabaseSelected, setErrorDatabase, setLoadingDatabase, fetchAllDatabase, deleteDatabase, postDatabase, selectDatabaseSelected, selectDatabases, selectLoading, selectError } from "@/domain/usecases/database-slice";

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

describe("Database Reducers", () => {
  it('should handle set databaseSelected', async () => {
    const nextState = databaseSlice.reducer(initialState, setDatabaseSelected('databaseName'));
    expect(nextState.databaseSelected).toEqual('databaseName');
  })

  it('should handle set error', () => {
    const nextState = databaseSlice.reducer(initialState, setErrorDatabase('An error has occurred.'));
    expect(nextState.error).toEqual('An error has occurred.');
  })

  it('should handle set loading', () => {
    const nextState = databaseSlice.reducer(initialState, setLoadingDatabase(true));
    expect(nextState.loading).toEqual(true);
  })
})

describe("Database Selectors", () => {
  it('should select databaseSelected', () => {
    const state = {
      database: {
        ...initialState,
        databaseSelected: 'databaseName'
      }
    }
    const selectValue = selectDatabaseSelected(state);
    expect(selectValue).toEqual('databaseName');
  })

  it('should select error', () => {
    const state = {
      database: {
        ...initialState,
        error: 'An error has occurred.'
      }
    }
    const selectValue = selectError(state);
    expect(selectValue).toEqual('An error has occurred.');
  })

  it('should select loading', () => {
    const state = {
      database: {
        ...initialState,
        loading: true
      }
    }
    const selectValue = selectLoading(state);
    expect(selectValue).toEqual(true);
  })

  it('should select databases', () => {
    const state = {
      database: {
        ...initialState,
        databases: ['db1', 'db2']
      }
    }
    const selectValue = selectDatabases(state as any);
    expect(selectValue).toEqual(['db1', 'db2']);
  })
});

// describe("Database Async Actions", () => {
  // test('should handle fetchAllDatabase successfully', async () => {
  //   const store = mockStore({});
  //   await (store.dispatch as ThunkDispatch<any, any, AnyAction>)(fetchAllDatabase());
  //   const actions = store.getActions();
  //   expect(actions[0].type).toEqual(fetchAllDatabase.fulfilled.type);
  // }, 10000)

  // it('should handle deleteDatabase successfully', async () => {
  //   const store = mockStore({});
  //   await (store.dispatch as ThunkDispatch<any, any, AnyAction>)(deleteDatabase('databaseName'));
  //   const actions = store.getActions();
  //   expect(actions[0].type).toEqual(deleteDatabase.fulfilled.type);
  // })

  // it('should handle postDatabase successfully', async () => {
  //   const store = mockStore({});
  //   const databaseData = { databaseName: 'test', collectionName: 'collection' };
  //   await (store.dispatch as ThunkDispatch<any, any, AnyAction>)(postDatabase(databaseData));
  //   const actions = store.getActions();
  //   expect(actions[0].type).toEqual(postDatabase.fulfilled.type);
  // })
// })
