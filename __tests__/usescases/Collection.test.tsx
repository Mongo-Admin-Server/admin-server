/* eslint-disable no-undef */
import { collectionSlice, initialState, setCollectionSelected, setErrorCollection, setLoadingCollection, selectCollectionSelected, selectLoadingCollection, selectErrorCollection } from "@/domain/usecases/collection-slice";

describe("Collection Reducers", () => {
  it('should handle set collectionSelected', () => {
    const nextState = collectionSlice.reducer(initialState, setCollectionSelected('collectionName'));
    expect(nextState.collectionSelected).toEqual('collectionName');
  })

  it('should handle set error', () => {
    const nextState = collectionSlice.reducer(initialState, setErrorCollection('An error has occurred.'));
    expect(nextState.error).toEqual('An error has occurred.');
  })

  it('should handle set loading', () => {
    const nextState = collectionSlice.reducer(initialState, setLoadingCollection(true));
    expect(nextState.loading).toEqual(true);
  })
})

describe("Collection Selectors", () => {
  it('should select collectionSelected', () => {
    const state = {
      collection: {
        ...initialState,
        collectionSelected: 'collectionName'
      }
    }
    const selectValue = selectCollectionSelected(state);
    expect(selectValue).toEqual('collectionName');
  })

  it('should select error', () => {
    const state = {
      collection: {
        ...initialState,
        error: 'An error has occurred.'
      }
    }
    const selectValue = selectErrorCollection(state);
    expect(selectValue).toEqual('An error has occurred.');
  })

  it('should select loading', () => {
    const state = {
      collection: {
        ...initialState,
        loading: true
      }
    }
    const selectValue = selectLoadingCollection(state);
    expect(selectValue).toEqual(true);
  })
})