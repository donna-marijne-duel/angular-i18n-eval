/// <reference types="@angular/localize" />

import { loadTranslations, MessageId, TargetMessage } from "@angular/localize";
import "@angular/localize/init";
import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";

// Read locale from local storage before app initialization
const localeFromStorage = localStorage.getItem("locale") ?? "en";

// Init provided language
initLanguage(localeFromStorage)
  // Only load text after locale is initialized to translate static file
  .then(() => import("./app/app.component"))
  .then((module) =>
    bootstrapApplication(
      module.AppComponent,
      appConfig(localeFromStorage),
    ).catch((err) => console.error(err)),
  );

async function initLanguage(locale: string): Promise<void> {
  if (locale === "en") {
    // Default behavior, no changes required
    return;
  }

  const response = await fetch(`/locale/messages.${locale}.json`);
  const messages: Record<MessageId, TargetMessage> = JSON.parse(
    await response.text(),
  );

  // Initialize translation
  loadTranslations(messages);
  $localize.locale = locale;

  // TODO: Load required locale module (needs to be adjusted for different locales)
  //
  // const localeModule = await import(
  //   `../node_modules/@angular/common/locales/de`
  // );
  // registerLocaleData(localeModule.default);
}
