export type SettingState = {
  theme: string;
  language: string;
};

export type LanguageType = 'en' | 'fr' | 'es';
export interface Language {
  value: LanguageType;
  label: string;
}

export type ThemeType = 'light' | 'dark';


