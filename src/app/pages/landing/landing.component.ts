import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { HOME_BACKGROUND_IMAGE_URL } from "../../utils/constants";

@Component({
  selector: "app-landing",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./landing.component.html",
  styleUrl: "./landing.component.scss",
})
export class LandingComponent {
  homeBackgroundURL = HOME_BACKGROUND_IMAGE_URL;
}
