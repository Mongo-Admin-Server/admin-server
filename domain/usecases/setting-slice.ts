import {
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { SettingState } from "../entities/setting-types";

const initialState: SettingState = {
  theme: "light",
  language: "en",
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      localStorage.setItem("theme", action.payload);
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      localStorage.setItem("locale", action.payload);
      state.language = action.payload;
    }
  },
});

export const { setTheme } = settingSlice.actions;

const selectThemes = (state: { setting: SettingState }) => state.setting;

export const selectTheme = createSelector(
  selectThemes,
  (setting) => setting.theme
);

export default settingSlice.reducer;