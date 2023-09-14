/* eslint-disable no-undef */
import { databaseSlice, initialState, setDatabaseSelected, setErrorDatabase, setLoadingDatabase, selectDatabaseSelected, selectDatabases, selectLoading, selectError } from "@/domain/usecases/database-slice";

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
