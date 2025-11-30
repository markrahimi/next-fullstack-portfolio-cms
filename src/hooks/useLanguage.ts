import { useContext } from "react";
import { LanguageContext } from "@/providers/language-provider";
import { Language } from "@/types/language";

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function useLocalizedData<T>(dataGetter: (lang: Language) => T): T {
  const { language } = useLanguage();
  return dataGetter(language);
}
