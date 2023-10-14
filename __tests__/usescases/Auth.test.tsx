/* eslint-disable no-undef */
import { initialState, selectErrorAuth, selectLoadingAuth } from "@/domain/usecases/auth-slice";

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