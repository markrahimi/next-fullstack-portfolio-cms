export type Language = "fr" | "en";

export type Translations = Record<string, any>;

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}
