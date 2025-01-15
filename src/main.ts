/// <reference types="@angular/localize" />

import { loadTranslations, MessageId, TargetMessage } from "@angular/localize";
import "@angular/localize/init";
import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";

// local storage for demo purposes
const localeFromStorage = localStorage.getItem("locale") ?? "en";
const brandFromStorage = localStorage.getItem("brand") ?? "jeans";

initLanguage(localeFromStorage)
  .then(() => import("./app/app.component"))
  .then((module) =>
    bootstrapApplication(
      module.AppComponent,
      appConfig(localeFromStorage),
    ).catch((err) => console.error(err)),
  );

async function initLanguage(locale: string): Promise<void> {
  const response = await fetch(`/locale/messages.${locale}.json`);
  const messages = JSON.parse(await response.text());
  const overrides = await getCustomMessages(brandFromStorage, locale);

  loadTranslations({ ...messages.translations, ...overrides });
  $localize.locale = locale;

  // TODO: Load required locale module (needs to be adjusted for different locales)
  //
  // const localeModule = await import(
  //   `../node_modules/@angular/common/locales/de`
  // );
  // registerLocaleData(localeModule.default);
}

type Translations = Record<MessageId, TargetMessage>;
type TranslationsByLanguage = Record<string, Translations>;
type TranslationsByBrandAndLanguage = Record<string, TranslationsByLanguage>;

const OVERRIDES: TranslationsByBrandAndLanguage = {
  rabanne: {
    en: {
      "app.copyright": "© {$INTERPOLATION} Rabanne, all rights reserved",
      "app.welcome":
        "Welcome to your {$START_TAG_STRONG}Rabanne portal!{$CLOSE_TAG_STRONG}",
    },
    es: {
      "app.copyright":
        "© {$INTERPOLATION} Rabanne, reservados todos los derechos",
      "app.welcome":
        "Bienvenido a tu {$START_TAG_STRONG}Rabanne portal!{$CLOSE_TAG_STRONG}",
    },
  },
  "victoria's secret": {
    en: {
      "app.copyright":
        "© {$INTERPOLATION} Victoria's Secret, all rights reserved",
      "app.welcome":
        "Welcome to your {$START_TAG_STRONG}VS portal!{$CLOSE_TAG_STRONG}",
    },
  },
};

async function getCustomMessages(
  brand: string | null,
  locale: string,
): Promise<Translations> {
  // from the API or something
  return new Promise((resolve, _) => {
    setTimeout(() => {
      if (brand && OVERRIDES[brand]?.[locale]) {
        resolve(OVERRIDES[brand][locale]);
      } else {
        resolve({});
      }
    }, 100);
  });
}
