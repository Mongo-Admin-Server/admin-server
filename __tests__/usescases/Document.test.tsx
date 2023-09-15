/* eslint-disable no-undef */
import { documentSlice, initialState, setErrorDocument, setLoadingDocument, selectErrorDocument, selectLoadingDocument } from "@/domain/usecases/document-slice";

describe("Document Reducers", () => {
  it('should handle set error', () => {
    const nextState = documentSlice.reducer(initialState, setErrorDocument('An error has occurred.'));
    expect(nextState.error).toEqual('An error has occurred.');
  })

  it('should handle set loading', () => {
    const nextState = documentSlice.reducer(initialState, setLoadingDocument(true));
    expect(nextState.loading).toEqual(true);
  })
})

describe("Document Selectors", () => {
  it('should select error', () => {
    const state = {
      document: {
        ...initialState,
        error: 'An error has occurred.'
      }
    }
    const selectValue = selectErrorDocument(state);
    expect(selectValue).toEqual('An error has occurred.');
  })

  it('should select loading', () => {
    const state = {
      document: {
        ...initialState,
        loading: true
      }
    }
    const selectValue = selectLoadingDocument(state);
    expect(selectValue).toEqual(true);
  })
})