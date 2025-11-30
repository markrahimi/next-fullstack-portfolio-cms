"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Language, LanguageContextType, Translations } from "@/types/language";
import frTranslations from "@/locale/fr.json";
import enTranslations from "@/locale/en.json";

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  fr: frTranslations,
  en: enTranslations,
};

function getNestedValue(obj: Record<string, unknown>, path: string): string | string[] {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }

  if (typeof current === "string") {
    return current;
  }
  if (Array.isArray(current)) {
    return current as string[];
  }
  return path;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
      updateDocumentLanguage(savedLanguage);
    }
  }, []);

  const updateDocumentLanguage = (lang: Language) => {
    document.documentElement.lang = lang;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    updateDocumentLanguage(lang);
  };

  const t = useCallback(
    (key: string): string | string[] => {
      return getNestedValue(translations[language] as unknown as Record<string, unknown>, key);
    },
    [language]
  );

  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
