import { Router } from "@angular/router";
import { Component } from "@angular/core";

import {
  NOT_FOUND_BACKGROUND_IMAGE_URL,
  NOT_FOUND_IMAGE_URL,
} from "../../utils/constants";

@Component({
  selector: "app-notfound",
  standalone: true,
  imports: [],
  templateUrl: "./notfound.component.html",
  styleUrl: "./notfound.component.scss",
})
export class NotFoundComponent {
  notFoundImageURL = NOT_FOUND_IMAGE_URL;
  notFoundBackgroundImageURL = NOT_FOUND_BACKGROUND_IMAGE_URL;

  constructor(private router: Router) {}

  navigateHome(): void {
    this.router.navigate(["/"]);
  }
}
