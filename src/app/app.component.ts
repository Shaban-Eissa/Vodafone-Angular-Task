import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "VodafoneTask";
}
