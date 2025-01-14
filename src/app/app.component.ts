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

  protected locales = ["en", "de-DE"];

  protected two = $localize`Two`;
  protected componentMessageWithId = $localize`:@@component-message.with-id:Component message with ID`;
  protected name = "Dolores";

  protected setLocale(locale: string): void {
    localStorage.setItem("locale", locale);
    window.location.reload();
  }
}
