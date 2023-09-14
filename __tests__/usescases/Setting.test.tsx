/* eslint-disable no-undef */
import { settingSlice, initialState, setTheme, setLanguage, selectLanguage, selectTheme } from "@/domain/usecases/setting-slice";

describe("Setting Reducers", () => {
  it('should handle set theme', () => {
    const nextState = settingSlice.reducer(initialState, setTheme('dark'));
    expect(nextState.theme).toEqual('dark');
  })

  it('should handle set language', () => {
    const nextState = settingSlice.reducer(initialState, setLanguage('en'));
    expect(nextState.language).toEqual('en');
  })
})

describe("Setting Selectors", () => {
  it('should select theme', () => {
    const state = {
      setting: {
        ...initialState,
        theme: 'dark'
      }
    }
    const selectValue = selectTheme(state);
    expect(selectValue).toEqual('dark');
  })

  it('should select language', () => {
    const state = {
      setting: {
        ...initialState,
        language: 'en'
      }
    }
    const selectValue = selectLanguage(state);
    expect(selectValue).toEqual('en');
  })
})