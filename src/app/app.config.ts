import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";

export function appConfig(locale: string): ApplicationConfig {
  return {
    providers: [
      { provide: LOCALE_ID, useValue: locale },
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
    ],
  };
}
