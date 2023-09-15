import {
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { SettingState } from "../entities/setting-types";

let defaultTheme = "light";
if (typeof window !== "undefined") {
  defaultTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", defaultTheme);
  localStorage.setItem("theme", defaultTheme);
}

export const initialState: SettingState = {
  theme: defaultTheme,
  language: "en",
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      localStorage.setItem("theme", action.payload);
      document.documentElement.setAttribute("data-theme", action.payload);
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      localStorage.setItem("locale", action.payload);
      state.language = action.payload;
    }
  },
});

export const { setTheme, setLanguage } = settingSlice.actions;

const selectSettings = (state: { setting: SettingState }) => state.setting;

export const selectTheme = createSelector(
  selectSettings,
  (setting) => setting.theme
);

export const selectLanguage = createSelector(
  selectSettings,
  (setting) => setting.language
)

export default settingSlice.reducer;