import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const localStorageKey = "i18nextLng";

export type AvailableLocale = "en" | "sk" | "cz";
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AvailableLocale = {
  EN: "en" as AvailableLocale,
  SK: "sk" as AvailableLocale,
  CZ: "cz" as AvailableLocale,
};

i18n
  .use(Backend) // load translations from .json files async
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    backend: {
      loadPath: (lngs) => `/static/locales/${lngs}.json`,
    },
    fallbackLng: AvailableLocale.CZ,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export const languages: Array<{
  code: string;
  flag: string;
  nativeName: string;
}> = [
  { code: AvailableLocale.CZ, flag: "cz", nativeName: "Čeština" },
  { code: AvailableLocale.SK, flag: "sk", nativeName: "Slovenčina" },
  { code: AvailableLocale.EN, flag: "gb", nativeName: "English" },
];
