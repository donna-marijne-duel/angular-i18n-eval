import { Component, inject, LOCALE_ID } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-root",
  imports: [FormsModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  protected locale = inject(LOCALE_ID);

  protected locales = ["en", "de-DE", "es"];

  protected brand = localStorage.getItem("brand")!;
  protected brands = ["jeans", "victoria's secret", "rabanne"];

  protected two = $localize`Two`;
  protected name = "Dolores";
  protected copyrightYear = 1999;

  protected setBrand(brand: string): void {
    localStorage.setItem("brand", brand);
    window.location.reload();
  }

  protected setLocale(locale: string): void {
    localStorage.setItem("locale", locale);
    window.location.reload();
  }
}
