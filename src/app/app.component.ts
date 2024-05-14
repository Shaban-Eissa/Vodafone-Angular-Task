import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { LandingComponent } from "./pages/landing/landing.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
    LandingComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "Vodafone";
}
