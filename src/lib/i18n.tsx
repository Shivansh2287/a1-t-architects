"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type Locale = "fr" | "en";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "fr",
  setLocale: () => {},
  t: (k) => k,
});

export function useI18n() {
  return useContext(I18nContext);
}

import { translations } from "./translations";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const stored = localStorage.getItem("mersi-locale") as Locale | null;
    if (stored === "en" || stored === "fr") setLocaleState(stored);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("mersi-locale", l);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[locale];
      return (dict as Record<string, string>)[key] ?? key;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
