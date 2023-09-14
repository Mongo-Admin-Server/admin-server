/* eslint-disable no-undef */
import { authSlice, initialState, setErrorAuth, setIsLogged, setLoadingAuth, selectErrorAuth, selectIsLogged, selectLoadingAuth } from "@/domain/usecases/auth-slice";

describe("Auth Reducers", () => {
  it('should handle set error', () => {
    const nextState = authSlice.reducer(initialState, setErrorAuth('An error has occurred.'));
    expect(nextState.error).toEqual('An error has occurred.');
  })

  it('should handle set isLogged', () => {
    const nextState = authSlice.reducer(initialState, setIsLogged(true));
    expect(nextState.isLogged).toEqual(true);
  })

  it('should handle set loading', () => {
    const nextState = authSlice.reducer(initialState, setLoadingAuth(true));
    expect(nextState.loading).toEqual(true);
  })
})

describe("Auth Selectors", () => {
  it('should select error', () => {
    const state = {
      auth: {
        ...initialState,
        error: 'An error has occurred.'
      }
    }
    const selectValue = selectErrorAuth(state);
    expect(selectValue).toEqual('An error has occurred.');
  })

  it('should select isLogged', () => {
    const state = {
      auth: {
        ...initialState,
        isLogged: true
      }
    }
    const selectValue = selectIsLogged(state);
    expect(selectValue).toEqual(true);
  })

  it('should select loading', () => {
    const state = {
      auth: {
        ...initialState,
        loading: true
      }
    }
    const selectValue = selectLoadingAuth(state);
    expect(selectValue).toEqual(true);
  })
})